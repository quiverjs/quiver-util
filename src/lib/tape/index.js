export function fulfilled(promise) {
  promise.then(() => {
    this.end()
  }, this.fail)
}

export function rejected(promise) {
  promise.then(this.fail, err => {
    this.ok(err)
    this.end()
  })
}

export function asyncTest(name, fn) {
  this.test(name, assert => {
    assert::fulfilled(fn(assert))
  })
}
