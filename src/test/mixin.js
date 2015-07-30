import test from 'tape'
import { mixin } from '../lib/object'

test('mixin test', assert => {
  assert.test('should mixin getter', assert => {
    const obj = {
      get foo() {
        return 'foo'
      }
    }

    const bar = {
      get bar() {
        return 'bar'
      }
    }

    mixin(obj, bar)
    assert.equal(obj.bar, 'bar')

    assert.throws(() => {
      obj.bar = 'baz'
    })

    assert.end()
  })

  assert.test('should override original getter', assert => {
    const obj = {
      get foo() {
        return 'foo'
      }
    }

    const other = {
      foo: 'bar'
    }

    mixin(obj, other)
    assert.equal(obj.foo, 'bar')

    assert.doesNotThrow(() => {
      obj.foo = 'baz'
    })

    assert.end()
  })

  assert.end()
})
