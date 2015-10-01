export const createPromise = construct =>
  new Promise(construct)

export const resolve = val =>
  Promise.resolve(val)

export const reject = err =>
  Promise.reject(err)

export const timeout = time =>
  createPromise(resolve =>
    setTimeout(resolve, time))

export const safePromised = fn =>
  (...args) =>
    createPromise(resolve =>
      resolve(fn(...args)))

export const resolveAny = (promises) => {
  if(promises.length === 0) return Promise.resolve()

  return new Promise((resolve, reject) => {
    for(let promise of promises) {
      promise.then(resolve, reject)
    }
  })
}

export const $finally = function(callback) {
  return this.then(
    () => callback(), err => callback())
}
