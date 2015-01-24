let defaultProto = Object.getPrototypeOf({})

let noCopyKey = Symbol('noCopy')

let shouldNotCopy = object =>
  object[noCopyKey] == true

export let copy = (object, options={}) => {
  let { forceCopy=false, excludeFields } = options

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
   * Except that we cache the default prototype in the letiable defaultProto.
   *
   * This works because all objects created through the hash literal
   * or new Object() all shares the same prototype.
   */
  let proto = Object.getPrototypeOf(object)
  if(proto !==  defaultProto && proto != null) {
    return object
  }

  if(excludeFields) {
    return copyPlainObjectWithExcludes(object, excludeFields)
  } else {
    return copyPlainObject(object)
  }
}

let copyPlainObject = object => {
  let newObject = Object.create(null)

  for(let key in object) {
    newObject[key] = copy(object[key])
  }

  for(let symbol of Object.getOwnPropertySymbols(object)) {
    newObject[symbol] = copy(object[symbol])
  }

  return newObject
}

let copyPlainObjectWithExcludes = (object, excludeFields) => {
  let newObject = Object.create(null)

  for(let key in object) {
    if(excludeFields.indexOf(key) > -1) continue

    let value = object[key]
    newObject[key] = copy(value)
  }

  return newObject
}

let copyArray = array => {
  let newArray = []
  array.forEach(function(value) {
    newArray.push(copy(value))
  })
  return newArray
}

export let noCopy = obj => {
  if(!obj) return obj
  Object.defineProperty(obj, noCopyKey, {
    enumerable: false,
    writable: true,
    value: true
  })
  return obj
}
