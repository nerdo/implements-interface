/* global describe, test, expect */

import { getArguments } from './getArguments'

describe('getArguments', () => {
  describe('function toString() variations', () => {
    test('normal signature', () => {
      const fn = { toString: () => 'function foo (a, b, c) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b', 'c'])
    })

    test('without function keyword', () => {
      const fn = { toString: () => 'foo (a, b, c) { }' }

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b', 'c'])
    })
  })

  test('a normal function', () => {
    const fn = function (a, b, c) { }

    const result = getArguments(fn)

    expect(result).toBeDefined()
    expect(result).toEqual(['a', 'b', 'c'])
  })

  describe('an arrow function', () => {
    test('with no arguments', () => {
      const fn = () => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual([])
    })

    test('with one argument and no parenthesis', () => {
      const fn = a => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a'])
    })

    test('with one argument parenthesis', () => {
      const fn = (a) => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a'])
    })

    test('with multiple arguments', () => {
      const fn = (a, b) => true

      const result = getArguments(fn)

      expect(result).toBeDefined()
      expect(result).toEqual(['a', 'b'])
    })
  })

  describe('a native function', () => {
    test('it does not throw an exception', () => {
      const result = () => getArguments(encodeURI)

      expect(result).not.toThrow()
    })

    // This is less something I want to prove, but more something I want to track if/when it changes.
    test('it always returns no arguments', () => {
      const result = getArguments(encodeURI)

      expect(result).toEqual([])
    })
  })
})
