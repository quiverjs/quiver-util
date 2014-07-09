var defaultProto = Object.getPrototypeOf({})

var noCopyKey = Symbol('noCopy')

var shouldNotCopy = object =>
  object[noCopyKey] == true

export var copy = (object, options={}) => {
  var { forceCopy=false, excludeFields } = options

  if((object == null) || (typeof(object) != 'object')) {
    return object
  }

  if(shouldNotCopy(object) && !forceCopy) {
    return object
  }

  if(Array.isArray(object)) {
    return copyArray(object)
  }

  /*
   * We don't perform copy on the object if it is not a plain object,
   * i.e. has a different prototype than the default one.
   *
   * The evaluation is the same as
   *  Object.getPrototypeOf(object) === Object.getPrototypeOf({})
   * Except that we cache the default prototype in the variable defaultProto.
   *
   * This works because all objects created through the hash literal
   * or new Object() all shares the same prototype.
   */
  var proto = Object.getPrototypeOf(object)
  if(proto !==  defaultProto && proto != null) {
    return object
  }

  if(excludeFields) {
    return copyPlainObjectWithExcludes(object, excludeFields)
  } else {
    return copyPlainObject(object)
  }
}

var copyPlainObject = object => {
  var newObject = Object.create(null)

  for(var key in object) {
    var value = object[key]
    newObject[key] = copy(value)
  }

  return newObject
}

var copyPlainObjectWithExcludes = (object, excludeFields) => {
  var newObject = Object.create(null)

  for(var key in object) {
    if(excludeFields.indexOf(key) > -1) continue

    var value = object[key]
    newObject[key] = copy(value)
  }

  return newObject
}

var copyArray = array => {
  var newArray = []
  array.forEach(function(value) {
    newArray.push(copy(value))
  })
  return newArray
}

export var noCopy = obj => {
  if(!obj) return obj
  Object.defineProperty(obj, noCopyKey, {
    enumerable: false,
    writable: true,
    value: true
  })
  return obj
}
