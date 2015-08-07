import test from 'tape'
import { error } from '../lib/error'

test('quiver error test', assert => {
  const err = error(404, 'Not Found')
  assert.equal(err.code, 404)
  assert.equal(err.message, 'Not Found')
  console.log(err)

  assert.end()
})
