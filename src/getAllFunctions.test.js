import { getAllFunctions } from './getAllFunctions'

describe('getAllFunctions()', () => {
  // This test ensures that running getAllFunctions on a built-in object like Date will not throw a
  // TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
  // functions or the arguments objects for calls to them
  it('should ignore arguments, caller, and callee properties of the object', () => {
    const obj = {
      arguments () {},
      caller () {},
      callee () {},
      foo () {}
    }

    const functions = getAllFunctions(obj)

    expect(functions.includes('foo')).toBe(true)
    expect(functions.includes('arguments')).toBe(false)
    expect(functions.includes('caller')).toBe(false)
    expect(functions.includes('callee')).toBe(false)
  })
})
