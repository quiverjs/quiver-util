import 'traceur'
import { merge } from '../lib/merge'

import chai from 'chai'
var should = chai.should()

var object1 = {
  'foo': 'foo value',
  'bar': 'bar value'
}

var object2 = {
  'bar': 'override bar',
  'baz': 'baz value'
}

describe('basic merge test', function() {
  it('should merge correctly', function() {
    var mergedObject = merge([object1, object2])

    mergedObject.foo.should.equal('foo value')
    mergedObject.bar.should.equal('override bar')
    mergedObject.baz.should.equal('baz value')

    object1.bar.should.equal('bar value')
    object2.bar.should.equal('override bar')
  })
})
