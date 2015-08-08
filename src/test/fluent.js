import test from 'tape'

import { fluentConstructor } from '../lib/object'

test('fluent constructor test', assert => {
  const createPerson = (options) => {
    const { firstName, lastName } = options

    return {
      name: firstName + ' ' + lastName
    }
  }

  const fluentCreate = fluentConstructor(['firstName', 'lastName'])

  const person1 = fluentCreate(createPerson)
    .firstName('john')
    .lastName('smith')

  assert.equal(person1.name, 'john smith')

  const person2 = fluentCreate(createPerson, {
    firstName: 'foo'
  })
  .lastName('bar')

  assert.equal(person2.name, 'foo bar')

  assert.throws(() => {
    fluentCreate(createPerson)
      .firstName('alice')
      .firstName('bob')
  })

  assert.end()
})
