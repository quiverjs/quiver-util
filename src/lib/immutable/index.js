import immutable from 'immutable'

export const immutableMap = immutable.Map
export const ImmutableMap = immutable.Map

export const immutableList = immutable.List
export const ImmutableList = immutable.List

export const isImmutableMap = map =>
  ImmutableMap.isMap(map)

export const isImmutableList = map =>
  ImmutableList.isList(map)
