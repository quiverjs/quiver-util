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
