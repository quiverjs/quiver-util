"use strict";
Object.defineProperties(exports, {
  merge: {get: function() {
      return merge;
    }},
  __esModule: {value: true}
});
var $__copy_46_js__;
var copy = ($__copy_46_js__ = require("./copy.js"), $__copy_46_js__ && $__copy_46_js__.__esModule && $__copy_46_js__ || {default: $__copy_46_js__}).copy;
var noCopy = (function(object) {
  return object;
});
var merge = (function(objects) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  var copyObject = options.copy ? copy : noCopy;
  var mergedObject = {};
  objects.forEach(function(object) {
    for (var key in object) {
      mergedObject[key] = copyObject(object[key]);
    }
  });
  return mergedObject;
});
