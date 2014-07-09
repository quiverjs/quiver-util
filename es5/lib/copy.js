"use strict";
Object.defineProperties(exports, {
  copy: {get: function() {
      return copy;
    }},
  noCopy: {get: function() {
      return noCopy;
    }},
  __esModule: {value: true}
});
var defaultProto = Object.getPrototypeOf({});
var noCopyKey = Symbol('noCopy');
var shouldNotCopy = (function(object) {
  return object[noCopyKey] == true;
});
var copy = (function(object) {
  var $__1;
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  var $__0 = $traceurRuntime.assertObject(options),
      forceCopy = ($__1 = $__0.forceCopy) === void 0 ? false : $__1,
      excludeFields = $__0.excludeFields;
  if ((object == null) || (typeof(object) != 'object')) {
    return object;
  }
  if (shouldNotCopy(object) && !forceCopy) {
    return object;
  }
  if (Array.isArray(object)) {
    return copyArray(object);
  }
  var proto = Object.getPrototypeOf(object);
  if (proto !== defaultProto && proto != null) {
    return object;
  }
  if (excludeFields) {
    return copyPlainObjectWithExcludes(object, excludeFields);
  } else {
    return copyPlainObject(object);
  }
});
var copyPlainObject = (function(object) {
  var newObject = Object.create(null);
  for (var key in object) {
    var value = object[key];
    newObject[key] = copy(value);
  }
  return newObject;
});
var copyPlainObjectWithExcludes = (function(object, excludeFields) {
  var newObject = Object.create(null);
  for (var key in object) {
    if (excludeFields.indexOf(key) > -1)
      continue;
    var value = object[key];
    newObject[key] = copy(value);
  }
  return newObject;
});
var copyArray = (function(array) {
  var newArray = [];
  array.forEach(function(value) {
    newArray.push(copy(value));
  });
  return newArray;
});
var noCopy = (function(obj) {
  if (!obj)
    return obj;
  Object.defineProperty(obj, noCopyKey, {
    enumerable: false,
    writable: true,
    value: true
  });
  return obj;
});
