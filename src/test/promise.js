import test from 'tape'

import { asyncTest, fulfilled, rejected } from '../lib/tape'

import {
  async, asyncMap, safePromised, promisify, resolve, timeout
} from '../lib/promise'

test('safe promised test', assert => {
  assert::asyncTest('should return promise', async function(assert) {
    const fn = () => 'foo'
    const wrapped = safePromised(fn)

    await wrapped().then(res => {
      assert.equal(res, 'foo')
    })

    assert.end()
  })

  assert::asyncTest('should catch exception', async function(assert) {
    const fn = () => { throw new Error('test') }
    const wrapped = safePromised(fn)

    await assert::rejected(wrapped())

    assert.end()
  })

  assert.end()
})

test('promisify test', assert => {
  assert::asyncTest('should convertible to promise', async function(assert) {
    const asyncTimesTwo = (num, callback) =>
      process.nextTick(() => callback(null, num*2))

    const promisedTimesTwo = promisify(asyncTimesTwo)

    await promisedTimesTwo(3).then(res => {
      assert.equal(res, 6)
    })

    assert.end()
  })

  assert::asyncTest('should convert callback error to rejected promise', async function(assert) {
    const asyncError = (callback) =>
      process.nextTick(() => callback(new Error()))

    const promisedError = promisify(asyncError)

    await assert::rejected(promisedError())

    assert.end()
  })

  assert.end()
})

test('async generator test', assert => {
  const nextTick = promisify(process.nextTick)

  const timesTwo = (num) =>
    nextTick().then(() => num*2)

  const plusThree = (num) =>
    nextTick().then(() => num+3)

  assert::asyncTest('nested yield', async function(assert) {
    const calc = async(function*(num) {
      return yield timesTwo(yield plusThree(num))
    })

    const res = await calc(1)
    assert.equal(res, 8)

    assert.end()
  })

  assert::asyncTest('exception test', async function(assert) {
    const fn = async(function*() {
      throw new Error('fail')
    })

    await assert::rejected(fn())

    assert.end()
  })

  assert.end()
})

test('async map test', assert => {
  assert.test('sanity check with sync map', assert => {
    let count = 0
    const array = [1,2,3,4,5,6,7,8,9,10]

    const mapped = array.map(value =>
      (value + (++count)))

    assert.deepEqual(mapped,
      [2,4,6,8,10,12,14,16,18,20])

    assert.end()
  })

  assert::asyncTest('Promise.all should map in parallel and non-deterministic', async function(assert) {
    let count = 0
    const array = [1,2,3,4,5,6,7,8,9,10]

    const mapped = await Promise.all(array.map(async function(value, index) {
      await timeout((10-index) * 10)

      return value + (++count)
    }))

    assert.notDeepEqual(mapped,
      [2,4,6,8,10,12,14,16,18,20])

    assert.deepEqual(mapped,
      [11,11,11,11,11,11,11,11,11,11])

    assert.end()
  })

  assert::asyncTest('should perform async map in series', async function(assert) {
    let count = 0
    const array = [1,2,3,4,5,6,7,8,9,10]

    const mapped = await array::asyncMap(async function(value, index) {
      await timeout((10-index) * 10)

      return value + (++count)
    })

    assert.deepEqual(mapped,
      [2,4,6,8,10,12,14,16,18,20])

    assert.end()
  })
})
