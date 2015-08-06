export function asyncTest(name, fn) {
  this.test(name, assert => {
    fn(assert)
    .then(assert.end, assert.fail)
  })
}
