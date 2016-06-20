import immutable from 'immutable'

export const immutableMap = immutable.Map
export const ImmutableMap = immutable.Map

export const immutableList = immutable.List
export const ImmutableList = immutable.List

export const isImmutable = iterable =>
  immutable.is(iterable)

export const isImmutableMap = map =>
  ImmutableMap.isMap(map)

export const isImmutableList = list =>
  ImmutableList.isList(list)

const extractHandler = {
  get(target, name) {
    return target.get(name)
  },

  has(target, name) {
    return target.has(name)
  },

  set(target, name, value) {
    throw new Error('extract target is immutable')
  }
}

export const extractMap = map => {
  if(!isImmutableMap(map)) {
    throw new TypeError('extract target must be immutable map')
  }

  return new Proxy(map, extractHandler)
}

export const extract = function() {
  return extractMap(this)
}
