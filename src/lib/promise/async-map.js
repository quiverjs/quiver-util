// async series map
export const asyncMap = function(mapper, mapMethod='map') {
  let promise = Promise.resolve()
  return Promise.all(this[mapMethod](
    (...args) => {
      promise = promise.then(
        () => mapper(...args))

      return promise
    }))
}
