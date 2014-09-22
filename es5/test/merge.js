"use strict";
var $__traceur_64_0_46_0_46_6__,
    $___46__46__47_lib_47_merge_46_js__;
($__traceur_64_0_46_0_46_6__ = require("traceur"), $__traceur_64_0_46_0_46_6__ && $__traceur_64_0_46_0_46_6__.__esModule && $__traceur_64_0_46_0_46_6__ || {default: $__traceur_64_0_46_0_46_6__});
var merge = ($___46__46__47_lib_47_merge_46_js__ = require("../lib/merge.js"), $___46__46__47_lib_47_merge_46_js__ && $___46__46__47_lib_47_merge_46_js__.__esModule && $___46__46__47_lib_47_merge_46_js__ || {default: $___46__46__47_lib_47_merge_46_js__}).merge;
var should = require('should');
var object1 = {
  'foo': 'foo value',
  'bar': 'bar value'
};
var object2 = {
  'bar': 'override bar',
  'baz': 'baz value'
};
describe('basic merge test', function() {
  it('should merge correctly', function() {
    var mergedObject = merge([object1, object2]);
    mergedObject.foo.should.equal('foo value');
    mergedObject.bar.should.equal('override bar');
    mergedObject.baz.should.equal('baz value');
    object1.bar.should.equal('bar value');
    object2.bar.should.equal('override bar');
  });
});
