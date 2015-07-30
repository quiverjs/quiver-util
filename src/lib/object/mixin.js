import { ownKeys } from './keys'

export const mixin = (target, source) => {
  for(let key of ownKeys(source)) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key)
    Object.defineProperty(target, key, descriptor)
  }
}
