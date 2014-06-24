"use strict";
require('traceur');
var $__0 = $traceurRuntime.assertObject(require('../lib/copy.js')),
    copy = $__0.copy,
    noCopy = $__0.noCopy;
var should = require('should');
describe('exclude copy test', (function() {
  it('should not copy excluded fieldds', (function() {
    var obj = {
      foo: 'foo value',
      bar: 'bar value'
    };
    var copied = copy(obj, {excludeFields: ['bar']});
    should.equal(copied.foo, 'foo value');
    should.not.exists(copied.bar);
  }));
}));
describe('no copy test', (function() {
  it('should copy', (function() {
    var obj = {foo: 'foo'};
    var copied = copy(obj);
    copied.foo = 'bar';
    should.equal(obj.foo, 'foo');
  }));
  it('enumerable should copy', (function() {
    var obj = {foo: 'foo'};
    obj.__noCopy = true;
    var copied = copy(obj);
    copied.foo = 'bar';
    should.notEqual(obj.foo, 'bar');
  }));
  it('non-enumerable should not copy', (function() {
    var obj = {foo: 'foo'};
    noCopy(obj);
    should.equal(obj.__noCopy, true);
    var copied = copy(obj);
    copied.foo = 'bar';
    should.equal(obj.foo, 'bar');
  }));
  it('force copy should copy', (function() {
    var obj = {foo: 'foo'};
    noCopy(obj);
    var copied = copy(obj, {forceCopy: true});
    copied.foo = 'bar';
    should.equal(obj.foo, 'foo');
  }));
  it('no copy null should make no error', (function() {
    noCopy(null);
  }));
}));
describe('null proto test', (function() {
  it('should copy null proto', (function() {
    var obj = Object.create(null);
    obj.foo = 'foo';
    var copied = copy(obj);
    copied.foo = 'bar';
    should.equal(obj.foo, 'foo');
  }));
  it('copied object should be null proto', (function() {
    var obj = {foo: 'foo'};
    var originalProto = Object.getPrototypeOf(obj);
    var defaultProto = Object.getPrototypeOf({});
    should.equal(originalProto, defaultProto);
    should.exist(obj.toString);
    var copied = copy(obj);
    var copyProto = Object.getPrototypeOf(copied);
    should.notEqual(originalProto, copyProto);
    should.equal(copyProto, null);
    should.not.exist(copied.toString);
  }));
}));
describe('copy object test', function() {
  var testFunctionValue = (function() {});
  var testComplexValue = new Error();
  var originalObject = {
    booleanValue: true,
    numberValue: 42,
    stringValue: 'foo',
    nullValue: null,
    functionValue: testFunctionValue,
    complexValue: testComplexValue,
    arrayValue: [true, 42, 'foo'],
    objectValue: {innerValue: 'bar'}
  };
  var testOriginalValue = (function(object) {
    object.booleanValue.should.equal(true);
    object.numberValue.should.equal(42);
    object.stringValue.should.equal('foo');
    should.not.exist(object.nullValue);
    object.functionValue == testFunctionValue;
    object.complexValue == testComplexValue;
    object.arrayValue[0].should.equal(true);
    object.arrayValue[1].should.equal(42);
    object.arrayValue[2].should.equal('foo');
    should.not.exist(object.arrayValue[3]);
    object.objectValue.innerValue.should.equal('bar');
    should.not.exist(object.objectValue.newInner);
  });
  var testChangedValue = (function(object) {
    object.booleanValue.should.equal(false);
    object.numberValue.should.equal(99);
    object.stringValue.should.equal('foobar');
    object.nullValue.should.equal('not null');
    testComplexValue.sideEffect.should.equal('has side effect');
    object.functionValue == testFunctionValue;
    object.complexValue == testComplexValue;
    object.arrayValue[0].should.equal(true);
    object.arrayValue[1].should.equal(42);
    object.arrayValue[2].should.equal('baz');
    object.arrayValue[3].should.equal('new element');
    should.not.exist(object.objectValue.innerValue);
    object.objectValue.newInner = 'new inner';
  });
  var modifyObject = (function(object) {
    object.booleanValue = false;
    object.numberValue = 99;
    object.stringValue += 'bar';
    object.nullValue = 'not null';
    object.complexValue.sideEffect = 'has side effect';
    object.arrayValue[2] = 'baz';
    object.arrayValue.push('new element');
    object.objectValue.innerValue = null;
    object.objectValue.newInner = 'new inner';
  });
  it('sanity test with original', (function() {
    testOriginalValue(originalObject);
  }));
  var objectCopy = copy(originalObject);
  it('copy should have same values as original', (function() {
    testOriginalValue(objectCopy);
  }));
  it('modification of copy should not affect original', (function() {
    modifyObject(objectCopy);
    testChangedValue(objectCopy);
    testOriginalValue(originalObject);
    ;
    ((function() {
      testOriginalValue(objectCopy);
    })).should.throw();
    ;
    ((function() {
      testChangedValue(originalObject);
    })).should.throw();
  }));
});
