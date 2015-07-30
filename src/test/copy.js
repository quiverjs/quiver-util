import test from 'tape'
import { copy, noCopy } from '../lib/object'

test('exclude copy test', assert => {
  assert.test('should not copy excluded fields', assert => {
    const obj = {
      foo: 'foo value',
      bar: 'bar value'
    }

    const copied = copy(obj, {
      excludeFields: ['bar']
    })

    assert.equal(copied.foo, 'foo value')
    assert.notOk(copied.bar)

    assert.end()
  })

  assert.end()
})

test('copy symbol test', assert => {
  assert.test('should copy symbol fields', assert => {
    const foo = Symbol('foo')
    const obj = {
      [foo]: 'foo value',
      bar: 'bar value'
    }

    const copied = copy(obj)

    assert.equal(copied[foo], 'foo value')
    assert.equal(copied.bar, 'bar value')

    assert.end()
  })
})

test('no copy test', assert => {
  assert.test('should copy', assert => {
    const obj = { foo: 'foo' }

    const copied = copy(obj)
    copied.foo = 'bar'

    assert.equal(obj.foo, 'foo')

    assert.end()
  })

  assert.test('should not copy', assert => {
    const obj = { foo: 'foo' }
    noCopy(obj)

    const copied = copy(obj)
    copied.foo = 'bar'

    assert.equal(obj.foo, 'bar')

    assert.end()
  })

  assert.test('force copy should copy', assert => {
    const obj = { foo: 'foo' }
    noCopy(obj)

    const copied = copy(obj, { forceCopy: true })
    copied.foo = 'bar'

    assert.equal(obj.foo, 'foo')

    assert.end()
  })

  assert.test('no copy null should make no error', assert => {
    noCopy(null)

    assert.end()
  })

  assert.end()
})


test('null proto test', assert => {
  assert.test('should copy null proto', assert => {
    const obj = Object.create(null)
    obj.foo = 'foo'

    const copied = copy(obj)
    copied.foo = 'bar'

    assert.equal(obj.foo, 'foo')

    assert.end()
  })

  assert.test('copied object should be null proto', assert => {
    const obj = {
      foo: 'foo'
    }
    const originalProto = Object.getPrototypeOf(obj)
    const defaultProto = Object.getPrototypeOf({ })

    assert.equal(originalProto, defaultProto)
    assert.ok(obj.toString)

    const copied = copy(obj)
    const copyProto = Object.getPrototypeOf(copied)

    assert.notEqual(originalProto, copyProto)
    assert.equal(copyProto, null)
    assert.notOk(copied.toString)

    assert.end()
  })

  assert.end()
})

test('copy object test', assert => {
  const testFunctionValue = () => { }
  const testComplexValue = new Error()

  const originalObject = {
    booleanValue: true,
    numberValue: 42,
    stringValue: 'foo',
    nullValue: null,
    functionValue: testFunctionValue,
    complexValue: testComplexValue,
    arrayValue: [
      true,
      42,
      'foo'
    ],
    objectValue: {
      innerValue: 'bar'
    }
  }

  const testOriginalValue = (assert, object) => {
    assert.equal(object.booleanValue, true)
    assert.equal(object.numberValue, 42)
    assert.equal(object.stringValue, 'foo')
    assert.equal(object.nullValue, null)

    assert.equal(object.functionValue, testFunctionValue)
    assert.equal(object.complexValue, testComplexValue)

    assert.equal(object.arrayValue[0], true)
    assert.equal(object.arrayValue[1], 42)
    assert.equal(object.arrayValue[2], 'foo')
    assert.notOk(object.arrayValue[3])

    assert.equal(object.objectValue.innerValue, 'bar')
    assert.notOk(object.objectValue.newInner)
  }

  const testChangedValue = (assert, object) => {
    assert.equal(object.booleanValue, false)
    assert.equal(object.numberValue, 99)
    assert.equal(object.stringValue, 'foobar')
    assert.equal(object.nullValue, 'not null')

    assert.equal(testComplexValue.sideEffect, 'has side effect')

    assert.equal(object.functionValue, testFunctionValue)
    assert.equal(object.complexValue, testComplexValue)

    assert.equal(object.arrayValue[0], true)
    assert.equal(object.arrayValue[1], 42)
    assert.equal(object.arrayValue[2], 'baz')
    assert.equal(object.arrayValue[3], 'new element')

    assert.notOk(object.objectValue.innerValue)
    assert.equal(object.objectValue.newInner, 'new inner')
  }

  const modifyObject = object => {
    object.booleanValue = false
    object.numberValue = 99
    object.stringValue += 'bar'
    object.nullValue = 'not null'

    object.complexValue.sideEffect = 'has side effect'

    object.arrayValue[2] = 'baz'
    object.arrayValue.push('new element')

    object.objectValue.innerValue = null
    object.objectValue.newInner = 'new inner'
  }

  assert.test('sanity test with original', assert => {
    testOriginalValue(assert, originalObject)

    assert.end()
  })

  const objectCopy = copy(originalObject)
  assert.test('copy should have same values as original', assert => {
    testOriginalValue(assert, objectCopy)

    assert.end()
  })

  assert.test('modification of copy should not affect original', assert => {
    modifyObject(objectCopy)
    testChangedValue(assert, objectCopy)
    testOriginalValue(assert, originalObject)

    assert.end()
  })

  assert.end()
})
