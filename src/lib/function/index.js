import { assertFunction } from '../assert'

export const methodfy = fn => {
  assertFunction(fn)

  const wrapped = function(...args) {
    return fn(this, ...args)
  }

  wrapped.unboundedFn = fn
  return wrapped
}

const fieldAccessorFromFields = fields => {
  if(fields.length == 0)
    throw new Error('fields length must be > 0')

  const [field, ...restFields] = fields

  const accessor = (obj={}) => obj[field]

  if(restFields.length == 0) {
    return accessor
  } else {
    const restAccessor = fieldAccessorFromFields(restFields)
    return obj => restAccessor(accessor(obj))
  }
}

export const fieldAccessor = fields => {
  if(Array.isArray(fields))
    return fieldAccessorFromFields(fields)

  if(typeof(fields) === 'string')
    return fieldAccessorFromFields(fields.split('.'))

  if(typeof(fields === 'symbol'))
    return fieldAccessorFromFields([fields])

  throw new Error('fields argument must be either array/string/symbol')
}
