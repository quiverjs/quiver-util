"use strict";
Object.defineProperties(exports, {
  copy: {get: function() {
      return copy;
    }},
  noCopy: {get: function() {
      return noCopy;
    }},
  merge: {get: function() {
      return merge;
    }},
  defineGetter: {get: function() {
      return defineGetter;
    }},
  singleOwnershipObject: {get: function() {
      return singleOwnershipObject;
    }},
  assertUndefined: {get: function() {
      return assertUndefined;
    }},
  assertInstanceOf: {get: function() {
      return assertInstanceOf;
    }},
  assertArrayInstanceOf: {get: function() {
      return assertArrayInstanceOf;
    }},
  assertFunction: {get: function() {
      return assertFunction;
    }},
  assertString: {get: function() {
      return assertString;
    }},
  __esModule: {value: true}
});
var merge = $traceurRuntime.assertObject(require('./merge.js')).merge;
var $__0 = $traceurRuntime.assertObject(require('./copy.js')),
    copy = $__0.copy,
    noCopy = $__0.noCopy;
var defineGetter = $traceurRuntime.assertObject(require('./getter.js')).defineGetter;
var singleOwnershipObject = $traceurRuntime.assertObject(require('./owner.js')).singleOwnershipObject;
var $__0 = $traceurRuntime.assertObject(require('./assert.js')),
    assertUndefined = $__0.assertUndefined,
    assertInstanceOf = $__0.assertInstanceOf,
    assertArrayInstanceOf = $__0.assertArrayInstanceOf,
    assertFunction = $__0.assertFunction,
    assertString = $__0.assertString;
;
