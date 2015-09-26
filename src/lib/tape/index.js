export function fulfilled(promise) {
  return promise.catch(
    err => {
      this.error(err)
      throw err
    })
}

export function rejected(promise) {
  return promise.then(
    res => this.fail(res),
    err => this.ok(err))
}

export function asyncTest(name, fn) {
  this.test(name, assert => {
    assert::fulfilled(fn(assert))
  })
}
