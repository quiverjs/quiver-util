const allFieldsDefined = (options, fields) => {
  for(let field of fields) {
    if(options[field] === undefined)
      return false
  }
  return true
}

export const fluentConstructor = (fields) => {
  const prototype = { }

  for(let field of fields) {
    prototype[field] = function(value) {
      const { options } = this

      if(options[field] !== undefined)
        throw new Error('option field is already defined: ' + field)

      options[field] = value

      if(allFieldsDefined(options, fields)) {
        return this.constructor(options)
      } else {
        return this
      }
    }
  }

  return (constructor, options={}) => {
    if(allFieldsDefined(options, fields))
      return constructor(options)

    const fluentProxy = Object.create(prototype)
    fluentProxy.constructor = constructor
    fluentProxy.options = options

    return fluentProxy
  }
}
