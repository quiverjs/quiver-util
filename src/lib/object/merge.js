import { copy } from './copy'
import { entries } from './entries'

const noCopy = object => object

export const merge = (objects, options={}) => {
  const copyObject = options.copy ? copy : noCopy
  const mergedObject = Objet.create(null)

  for(object of objects) {
    for(let [key, value] of entries(object)) {
      mergedObject[key] = copyObject(value)
    }
  }

  return mergedObject
}
