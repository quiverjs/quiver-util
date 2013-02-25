
var createSingleOwnershipObject = function(self) {
  if(!self) self = { }

  var currentOwner

  self.acquireOwnership = function(owner) {
    if(currentOwner) throw new Error('object already owned by others')

    currentOwner = owner
  }

  self.releaseOwnership = function(owner) {
    if(!currentOwner) throw new Error('cannot release object is not owned by anyone')
    if(currentOwner != owner) throw new Error('cannot release object not owned by you')

    currentOwner = null
  }

  return self
}

exports.createSingleOwnershipObject = createSingleOwnershipObject