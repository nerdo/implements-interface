/* global describe, test, expect */

import { getArguments } from './getArguments'

describe('getArguments()', () => {
  describe('function toString() variations', () => {
    it('should return arguments from a normal signature', () => {
      const fn = { toString: () => 'function foo (a, b, c) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('should return arguments from a signature without function keyword', () => {
      const fn = { toString: () => 'foo (a, b, c) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('should return arguments from a signature with the async keyword', () => {
      const fn = { toString: () => 'async foo (a, b, c) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('should return arguments from a default scalar argument', () => {
      const fn = { toString: () => 'function foo (z = 5) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['z'])
    })

    it('should return arguments from a default object argument', () => {
      const fn = { toString: () => 'function foo ({a = 5}) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['...undefined'])
    })
  })

  it('should work on a normal function', () => {
    const fn = function (a, b, c) { }

    const result = getArguments(fn)

    expect(result).toBeDefined()
    expect(result).toEqual(['a', 'b', 'c'])
  })

  describe('an arrow function', () => {
    it('should work with no arguments', () => {
      const fn = () => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual([])
    })

    it('should work with one argument and no parenthesis', () => {
      const fn = a => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a'])
    })

    it('should work with one argument parenthesis', () => {
      const fn = (a) => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a'])
    })

    it('should work with multiple arguments', () => {
      const fn = (a, b) => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b'])
    })
  })

  describe('a native function', () => {
    it('should not throw an exception', () => {
      const result = () => getArguments(encodeURI)

      expect(result).not.toThrow()
    })

    // This is less something I want to prove, but more something I want to track if/when it changes.
    it('should always return no arguments', () => {
      const result = getArguments(encodeURI)

      expect(result).toEqual([])
    })
  })
})
