import { map } from '../iterator'

// Await all promises yielded from iterator in series
// and convert them into array
export const awaitIterable = async function(iterable) {
  const result = []

  for(let promise of iterable) {
    result.push(await promise)
  }

  return result
}

// async series map an iterable
export const asyncMap = function(mapper) {
  return awaitIterable(this::map(mapper))
}
