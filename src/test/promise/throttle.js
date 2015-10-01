import test from 'tape'

import { asyncTest } from '../../lib/tape'

import { throttleAsync, timeout } from '../../lib/promise'

test::asyncTest('throttle async test', async function(assert) {
  const calledIds = []
  const fn = async function(id, sleepTime) {
    await timeout(sleepTime)
    calledIds.push(id)
  }

  const throttled = throttleAsync(fn, 3)

  // a, b, and c are called immediately
  const p1 = throttled('a', 200)
  const p2 = throttled('b', 100)
  const p3 = throttled('c', 300)

  // d called after b finish, taking total 110ms
  const p4 = throttled('d', 10)

  // e called after d finish, taking total 250ms
  const p5 = throttled('e', 140)

  // f called after a finish, taking total 210ms
  const p6 = throttled('f', 10)

  await Promise.all([p1,p2,p3,p4,p5,p6])

  assert.deepEqual(calledIds, ['b', 'd', 'a', 'f', 'e', 'c'],
    'called sequence should based on throttled execution')

  assert.end()
})
