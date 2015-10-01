import test from 'tape'

import { asyncTest, rejected } from '../../lib/tape'

import { safePromised, promisify } from '../../lib/promise'

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
