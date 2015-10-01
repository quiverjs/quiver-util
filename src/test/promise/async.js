import test from 'tape'

import { asyncTest, rejected } from '../../lib/tape'

import { async, promisify } from '../../lib/promise'

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
