import test from 'tape'

import { ImmutableMap, extract } from '../lib/immutable'

test('immutable extract test', assert => {
  const map = ImmutableMap()
    .set('foo', 'foo')
    .set('hello', 'world')

  const { foo, hello, bar, baz='baz', toString } = map::extract()

  assert.equal(foo, 'foo')
  assert.equal(hello, 'world')
  assert.notOk(bar)
  assert.equal(baz, 'baz')
  assert.notOk(toString)

  assert.throws(() => {
    const proxy = map::extract()
    proxy.bar = 'baz'
  })

  assert.end()
})
