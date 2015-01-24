export let defineGetter = (object, field, value) => {
  Object.defineProperty(object, field, {
    get: () => value
  })
}