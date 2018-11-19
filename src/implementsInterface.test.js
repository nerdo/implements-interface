import { implementsInterface } from './implementsInterface'

describe('implementsInterface function', () => {
  test('implementing an empty interface always returns true', () => {
    class Interface { }
    const instance = {
      foo () { },
      bar () { }
    }

    const result = implementsInterface(instance, Interface)

    expect(result).toBe(true)
  })

  test('implementing an interface with a new instance of the interface', () => {
    class Interface {
      foo () { }
      bar () { }
    }
    const instance = new Interface()

    const result = implementsInterface(instance, Interface)

    expect(result).toBe(true)
  })

  test('implementing an interface with a subclass', () => {
    class Interface {
      foo () { }
      bar () { }
    }
    class Foo {
      foo () { }
    }
    class FooBar extends Foo {
      bar () { }
    }

    const instance = new FooBar()

    const result = implementsInterface(instance, Interface)

    expect(result).toBe(true)
  })

  test('implementing an interface with functions with no arguments', () => {
    class Interface {
      foo () { }
      bar () { }
    }
    const instance = {
      foo () { },
      bar () { }
    }

    const result = implementsInterface(instance, Interface)

    expect(result).toBe(true)
  })

  test('implementing an interface with various function arguments', () => {
    class Interface {
      foo () { }
      bar (a, b, c) { }
      example (l, ...rest) { }
      // destructuring ({ arg, blah }) { }
    }
    const instance = {
      foo () { },
      bar (x, y, z) { },
      example (r, ...sleep) { },
      // destructuring ({ arg }) { },
      notPartOfTheInterface (does, not, fail) { }
    }

    const result = implementsInterface(instance, Interface)

    expect(result).toBe(true)
  })

  test('failing to implement an interface by omitting a function', () => {
    class Interface {
      foo () { }
      bar () { }
    }
    const instance = {
      bar () { }
    }

    const result = () => implementsInterface(instance, Interface)

    expect(result).toThrowError(/missing\s.*?methods/)
  })

  test('failing to implement an interface by omitting arguments to a function', () => {
    class Interface {
      foo (a) { }
    }
    const instance = {
      foo () { }
    }

    const result = () => implementsInterface(instance, Interface)

    expect(result).toThrowError(/does not match the interface signature/)
  })

  test('failing to implement an interface by having extra arguments to a function', () => {
    class Interface {
      foo (a) { }
    }
    const instance = {
      foo (x, y) { }
    }

    const result = () => implementsInterface(instance, Interface)

    expect(result).toThrowError(/does not match the interface signature/)
  })

  test('failing to implement an interface by having rest parameter where the interface has none', () => {
    class Interface {
      foo (a) { }
    }
    const instance = {
      foo (...a) { }
    }

    const result = () => implementsInterface(instance, Interface)

    expect(result).toThrowError(/does not match the interface signature/)
  })

  // This doesn't work properly right now because the test framework transpiles ES6 code...
  // Internally, the function signature is inspected by parsing function.toString(), which is the transpiled ES5 code.
  // test.only('failing to implement an interface by missing destructured arguments', () => {
  //   class Interface {
  //     foo ({ a, b }) { }
  //   }
  //   const instance = {
  //     foo (bar) { }
  //   }

  //   const result = () => implementsInterface(instance, Interface)

  //   expect(result).toThrowError(/does not match the interface signature/)
  // })
})
