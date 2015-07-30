import { copy } from './copy'
import { entries } from './keys'

const noCopy = object => object

export const merge = (objects, options={}) => {
  const copyObject = options.copy ? copy : noCopy
  const mergedObject = Object.create(null)

  for(let object of objects) {
    for(let [key, value] of entries(object)) {
      mergedObject[key] = copyObject(value)
    }
  }

  return mergedObject
}
