import test from 'tape'

import { methodfy, fieldAccessor } from '../lib/function'

test('methodfy test', assert => {
  const strConcat = (a, b) => a + ' ' + b
  const concatMethod = methodfy(strConcat)

  assert.equal(strConcat('hello', 'world'), 'hello world')
  assert.equal('hello'::concatMethod('world'), 'hello world')
  assert.equal(concatMethod.unboundedFn('hello', 'world'), 'hello world')

  assert.end()
})

test('field accessor test', assert => {
  const nestedAccessor = fieldAccessor('foo.bar.baz')
  assert.equal(nestedAccessor({
    foo: { bar: { baz: 'value' } }
  }), 'value')

  assert.equal(nestedAccessor({}), undefined)
  assert.equal(nestedAccessor({ foo: {} }), undefined)

  const symbolField = Symbol('@privateField')
  const arrayAccessor = fieldAccessor(['foo', symbolField, 'bar'])

  assert.equal(arrayAccessor({
    foo: {
      baz: 'baz',
      [symbolField]: { bar: 'value' },
    }
  }), 'value')

  assert.equal(arrayAccessor({
    foo: {
      [symbolField]: {}
    }
  }), undefined)

  assert.equal(arrayAccessor({ foo: {} }), undefined)

  const symbolAccessor = fieldAccessor(symbolField)
  assert.equal(symbolAccessor({
    [symbolField]: 'value'
  }), 'value')

  assert.end()
})
