import immutable from 'immutable'

export const immutableMap = immutable.Map
export const ImmutableMap = immutable.Map

export const isImmutableMap = map =>
  ImmutableMap.isMap(map)
