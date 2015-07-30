export const methodfy = fn =>
  function(...args) {
    return fn(this, ...args)
  }
