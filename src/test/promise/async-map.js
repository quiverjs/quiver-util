import test from 'tape'

import { asyncTest } from '../../lib/tape'

import { asyncMap, timeout } from '../../lib/promise'

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
