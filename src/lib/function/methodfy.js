import { assertFunction } from '../assert'

export const methodfy = fn => {
  assertFunction(fn)

  const wrapped = function(...args) {
    return fn(this, ...args)
  }

  wrapped.unboundedFn = fn
  return wrapped
}
