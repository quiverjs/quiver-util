"use strict";
Object.defineProperties(exports, {
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
let assertUndefined = (function(object, message) {
  if (object === void 0)
    throw new TypeError(message);
});
let assertInstanceOf = (function(object, Class, message) {
  if (!(object instanceof Class))
    throw new TypeError(message);
});
let assertArrayInstanceOf = (function(array, Class, message) {
  if (!Array.isArray(array))
    throw new TypeError('Object is not an array');
  array.forEach((function(object) {
    return assertInstanceOf(object, Class, message);
  }));
});
let assertFunction = (function(fn, message) {
  if (typeof(fn) != 'function')
    throw new TypeError(message);
});
let assertString = (function(string, message) {
  if (typeof(string) != 'string')
    throw new TypeError(message);
});
