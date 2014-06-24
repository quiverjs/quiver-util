export var singleOwnershipObject = (self={}) => {
  var currentOwner

  self.acquireOwnership = (owner={}) => {
    if(currentOwner) throw new Error('object already owned by others')

    currentOwner = owner
  }

  self.releaseOwnership = owner => {
    if(!currentOwner)
      throw new Error('cannot release object is not owned by anyone')

    if(currentOwner !== owner)
      throw new Error('cannot release object not owned by you')

    currentOwner = null
  }

  return self
}
