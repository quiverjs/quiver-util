"use strict";
Object.defineProperties(exports, {
  defineGetter: {get: function() {
      return defineGetter;
    }},
  __esModule: {value: true}
});
var defineGetter = (function(object, field, value) {
  Object.defineProperty(object, field, {get: (function() {
      return value;
    })});
});
