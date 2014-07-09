import { merge } from './merge.js'
import { copy, noCopy } from './copy.js'
import { defineGetter } from './getter.js'
import { singleOwnershipObject } from './owner.js'
import {
  assertUndefined, assertInstanceOf, assertArrayInstanceOf,
  assertFunction, assertString
} from './assert.js'

export {
  copy, noCopy, merge, defineGetter, singleOwnershipObject,
  assertUndefined, assertInstanceOf, assertArrayInstanceOf,
  assertFunction, assertString
}