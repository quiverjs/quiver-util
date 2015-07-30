export const map = function*(mapper) {
  for(let val of this) {
    yield mapper(val)
  }
}
