export const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(...args, (err, result) =>
        err ? reject(err) : resolve(result)))

export const promisifyMethod = (object, method) =>
  promisify((...args) =>
    object[method](...args))

export const promisifyMethods = (object, methods) =>
  methods.reduce((result, method) => {
    result[method] = promisifyMethod(object, method)
    return result
  }, Object.create(object))
