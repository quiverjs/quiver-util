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
let defaultProto = Object.getPrototypeOf({});
let noCopyKey = Symbol('noCopy');
let shouldNotCopy = (function(object) {
  return object[noCopyKey] == true;
});
let copy = (function(object) {
  var $__3;
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  let $__2 = options,
      forceCopy = ($__3 = $__2.forceCopy) === void 0 ? false : $__3,
      excludeFields = $__2.excludeFields;
  if ((object == null) || (typeof(object) != 'object')) {
    return object;
  }
  if (shouldNotCopy(object) && !forceCopy) {
    return object;
  }
  if (Array.isArray(object)) {
    return copyArray(object);
  }
  let proto = Object.getPrototypeOf(object);
  if (proto !== defaultProto && proto != null) {
    return object;
  }
  if (excludeFields) {
    return copyPlainObjectWithExcludes(object, excludeFields);
  } else {
    return copyPlainObject(object);
  }
});
let copyPlainObject = (function(object) {
  let newObject = Object.create(null);
  for (let key in object) {
    newObject[key] = copy(object[key]);
  }
  for (var $__0 = Object.getOwnPropertySymbols(object)[$traceurRuntime.toProperty(Symbol.iterator)](),
      $__1; !($__1 = $__0.next()).done; ) {
    let symbol = $__1.value;
    {
      newObject[symbol] = copy(object[symbol]);
    }
  }
  return newObject;
});
let copyPlainObjectWithExcludes = (function(object, excludeFields) {
  let newObject = Object.create(null);
  for (let key in object) {
    if (excludeFields.indexOf(key) > -1)
      continue;
    let value = object[key];
    newObject[key] = copy(value);
  }
  return newObject;
});
let copyArray = (function(array) {
  let newArray = [];
  array.forEach(function(value) {
    newArray.push(copy(value));
  });
  return newArray;
});
let noCopy = (function(obj) {
  if (!obj)
    return obj;
  Object.defineProperty(obj, noCopyKey, {
    enumerable: false,
    writable: true,
    value: true
  });
  return obj;
});
