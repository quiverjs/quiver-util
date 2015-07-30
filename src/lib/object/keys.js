export const ownKeys = function*(object) {
  yield* Object.getOwnPropertyNames(object)
  yield* Object.getOwnPropertySymbols(object)
}

export const entries = function*(object) {
  for(let key of ownKeys(object)) {
    yield [key, object[key]]
  }
}

export const objectToMap = object =>
  new Map(entries(object))
