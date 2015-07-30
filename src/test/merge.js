import test from 'tape'
import { merge } from '../lib/object'

const object1 = {
  'foo': 'foo value',
  'bar': 'bar value'
}

const object2 = {
  'bar': 'override bar',
  'baz': 'baz value'
}

test('basic merge test', assert => {
  const mergedObject = merge([object1, object2])

  assert.equal(mergedObject.foo, 'foo value')
  assert.equal(mergedObject.bar, 'override bar')
  assert.equal(mergedObject.baz, 'baz value')

  assert.equal(object1.bar, 'bar value')
  assert.equal(object2.bar, 'override bar')

  assert.end()
})
