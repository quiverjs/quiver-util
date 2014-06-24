"use strict";
Object.defineProperties(exports, {
  singleOwnershipObject: {get: function() {
      return singleOwnershipObject;
    }},
  __esModule: {value: true}
});
var singleOwnershipObject = (function() {
  var self = arguments[0] !== (void 0) ? arguments[0] : {};
  var currentOwner;
  self.acquireOwnership = (function() {
    var owner = arguments[0] !== (void 0) ? arguments[0] : {};
    if (currentOwner)
      throw new Error('object already owned by others');
    currentOwner = owner;
  });
  self.releaseOwnership = (function(owner) {
    if (!currentOwner)
      throw new Error('cannot release object is not owned by anyone');
    if (currentOwner !== owner)
      throw new Error('cannot release object not owned by you');
    currentOwner = null;
  });
  return self;
});
