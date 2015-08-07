import test from 'tape'

import { fulfilled, rejected } from '../lib/tape'

import {
  async, safePromised, promisify, resolve
} from '../lib/promise'

test('safe promised test', assert => {
  assert.test('should return promise', assert => {
    const fn = () => 'foo'
    const wrapped = safePromised(fn)

    assert::fulfilled(wrapped()
      .then(res => {
        assert.equal(res, 'foo')
      }))
  })

  assert.test('should catch exception', assert => {
    const fn = () => { throw new Error('test') }
    const wrapped = safePromised(fn)

    assert::rejected(wrapped())
  })

  assert.end()
})

test('promisify test', assert => {
  assert.test('should convertible to promise', assert => {
    const asyncTimesTwo = (num, callback) =>
      process.nextTick(() => callback(null, num*2))

    const promisedTimesTwo = promisify(asyncTimesTwo)

    assert::fulfilled(promisedTimesTwo(3)
      .then(res => {
        assert.equal(res, 6)
      }))
  })

  assert.test('should convert callback error to rejected promise', assert => {
    const asyncError = (callback) =>
      process.nextTick(() => callback(new Error()))

    const promisedError = promisify(asyncError)

    assert::rejected(promisedError())
  })

  assert.end()
})

test('async generator test', assert => {
  const nextTick = promisify(process.nextTick)

  const timesTwo = (num) =>
    nextTick().then(() => num*2)

  const plusThree = (num) =>
    nextTick().then(() => num+3)

  assert.test('nested yield', assert => {
    const calc = async(function*(num) {
      return yield timesTwo(yield plusThree(num))
    })

    assert::fulfilled(calc(1)
      .then(res => {
        assert.equal(res, 8)
      }))
  })

  assert.test('exception test', assert => {
    const fn = async(function*() {
      throw new Error('fail')
    })

    return assert::rejected(fn())
  })

  assert.end()
})
