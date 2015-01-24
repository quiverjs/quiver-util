export let assertUndefined = (object, message) => {
  if(object === void 0)
    throw new TypeError(message)
}

export let assertInstanceOf = (object, Class, message) => {
  if(!(object instanceof Class))
    throw new TypeError(message)
}

export let assertArrayInstanceOf = (array, Class, message) => {
  if(!Array.isArray(array))
    throw new TypeError('Object is not an array')

  array.forEach(object => 
    assertInstanceOf(object, Class, message))
}

export let assertFunction = (fn, message) => {
  if(typeof(fn) != 'function')
    throw new TypeError(message)
}

export let assertString = (string, message) => {
  if(typeof(string) != 'string')
    throw new TypeError(message)
}