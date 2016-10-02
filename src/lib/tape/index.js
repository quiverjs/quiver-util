export function fulfilled(promise, desc) {
  return promise.catch(
    err => {
      this.error(err, desc)
      throw err
    })
}

export function rejected(promise, desc) {
  return promise.then(
    res => this.fail(desc),
    err => this.ok(err, desc))
}

export function asyncTest(name, fn) {
  this.test(name, assert => {
    assert::fulfilled(fn(assert))
  })
}

export function immutableEqual(map, expected, desc) {
  this.deepEqual(map.toObject(), expected, desc)
}
