import { resolve, reject } from './basic'

export const runAsync = gen => {
  const doNext = action => {
    let done, value
    try {
      ;({ done, value } = action())
    } catch(err) {
      return reject(err)
    }

    if(done) return value

    return resolve(value).then(
      result => doNext(() => gen.next(result)),
      err => doNext(() => gen.throw(err)))
  }

  return resolve(doNext(() => gen.next()))
}

export const async = fn =>
  (...args) =>
    resolve(fn(...args)).then(runAsync)

const runSync = gen => {
  while(true) {
    const { done, value }  = gen.next()

    if(done) return value
  }
}
