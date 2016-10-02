import test from 'tape'
import { error, errorToStatusCode } from '../lib/error'

test('quiver error test', assert => {
  assert.test('basic test', assert => {
    const err = error(404, 'Not Found')
    assert.equal(err.code, 404)
    assert.equal(err.statusCode, 404)
    assert.equal(err.message, 'Not Found')

    console.log('Sample error string output:')
    console.log(err)

    assert.end()
  })

  assert.test('error to status code', assert => {
    assert.equal(
      errorToStatusCode(error(404, 'not found')),
      404)

    assert.equal(
      errorToStatusCode(error(502, 'bad gateway')),
      502)

    assert.equal(
      errorToStatusCode(error('404', 'not found')),
      404)

    assert.equal(
      errorToStatusCode(error('502', 'bad gateway')),
      502)

    assert.equal(
      errorToStatusCode(error(200, 'not ok')),
      500)

    assert.equal(
      errorToStatusCode(error(null, 'undefined')),
      500)

    assert.equal(
      errorToStatusCode(error(0, 'zero')),
      500)

    assert.equal(
      errorToStatusCode(error(400.1, 'zero')),
      500)

    assert.equal(
      errorToStatusCode(error('foo', 'bar')),
      500)

    assert.end()
  })
})
