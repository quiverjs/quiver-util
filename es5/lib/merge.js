"use strict";
Object.defineProperties(exports, {
  merge: {get: function() {
      return merge;
    }},
  __esModule: {value: true}
});
var $__copy__;
var copy = ($__copy__ = require("./copy"), $__copy__ && $__copy__.__esModule && $__copy__ || {default: $__copy__}).copy;
let noCopy = (function(object) {
  return object;
});
let merge = (function(objects) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  let copyObject = options.copy ? copy : noCopy;
  let mergedObject = {};
  objects.forEach(function(object) {
    for (let key in object) {
      mergedObject[key] = copyObject(object[key]);
    }
  });
  return mergedObject;
});
