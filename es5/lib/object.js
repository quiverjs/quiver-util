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
  singleOwnershipObject: {get: function() {
      return singleOwnershipObject;
    }},
  __esModule: {value: true}
});
var $__0 = $traceurRuntime.assertObject(require('./copy.js')),
    copy = $__0.copy,
    noCopy = $__0.noCopy;
var merge = $traceurRuntime.assertObject(require('./merge.js')).merge;
var singleOwnershipObject = $traceurRuntime.assertObject(require('./owner.js')).singleOwnershipObject;
;
