import { copy } from './copy'

let noCopy = object => object

export let merge = (objects, options={}) => {
  let copyObject = options.copy ? copy : noCopy
  let mergedObject = { }

  objects.forEach(function(object) {
    for(let key in object) {
      mergedObject[key] = copyObject(object[key])
    }
  })

  return mergedObject
}
