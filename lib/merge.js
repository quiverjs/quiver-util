import { copy } from './copy'

var noCopy = object => object

export var merge = (objects, options={}) => {
  var copyObject = options.copy ? copy : noCopy
  var mergedObject = { }

  objects.forEach(function(object) {
    for(var key in object) {
      mergedObject[key] = copyObject(object[key])
    }
  })

  return mergedObject
}
