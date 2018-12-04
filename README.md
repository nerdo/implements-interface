# implements-interface

A function that tests whether or not an object implements an interface defined by a prototype.

There are some important caveats. It does _not_ work reliably when testing against functions that evaluate to:

* Native functions: As far as I know, it isn't possible to get the arguments from a native function so always return an empty set. Depending on whether your interface method has arguments or not, you will either get a false positive or a false negative.
* Bound functions: If you bind a function, e.g. `const bar = foo.bind(this)`, the returned function (in this case, `bar`) turns out to be native and has the same drawbacks.

## Installing

```
npm install --save-dev implements-interface
```

## Getting Started

Import the library, define your interface as a regular JavaScript class, and simply call implementsInterface with the object to test and the interface (class), e.g.:

```
import { implementsInterface } from 'implements-interface'

class FooBarInterface {
  foo (x, y) { }
  bar (z, ...rest) { }
}

const passingObj = {
  foo (a, b) {
    // arbitrary implementation
  },
  bar (a, ...more) {
    // arbitrary implementation
  }
}

const failingObj = {
  foo (a, b, c) {
    // arbitrary implementation
  },
  bar (a, ...more) {
    // arbitrary implementation
  }
}

try {
  console.log(implementsInterface(passingObj, FooBarInterface)) // returns true
  console.log(implementsInterface(failingObj, FooBarInterface)) // throws Error
} catch (e) {
  console.log(e)
}
```

You can use this as a basis for a matcher in a testing framework, for example, with jest, a matcher might be defined and used like this:

```
/* global test, expect */
import { implementsInterface } from 'implements-interface'

expect.extend({
  toImplement (object, Interface) {
    try {
      implementsInterface(object, Interface)
      return {
        message: () => `expected object not to implement ${Interface.name}.`,
        pass: true
      }
    } catch (e) {
      return {
        message: () => e.message,
        pass: false
      }
    }
  }
})

class FooBarInterface {
  foo (x, y) { }
  bar (z, ...rest) { }
}

test('successfully implementing the FooBarInterface', () => {
  const object = {
    foo (a, b) {
      // arbitrary implementation
    },
    bar (a, ...more) {
      // arbitrary implementation
    }
  }

  expect(new FooBarInterface()).toImplement(FooBarInterface)
  expect(object).toImplement(FooBarInterface)
})

test('improperly implementing the FooBarInterface', () => {
  const object = {
    foo (a, b) {
      // arbitrary implementation
    },
    bar (a, more) {
      // arbitrary implementation
    }
  }

  expect(object).not.toImplement(FooBarInterface)
})
```
