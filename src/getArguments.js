import { parse } from 'babylon'

const maybe = x => x || {} // optionals support

/**
 * Gets arguments for a function.
 * Based on https://stackoverflow.com/a/31055217/2057996
 * @param {Function} func
 * @returns {Array}
 */
export function getArguments (func) {
  // eslint-disable-next-line quotes
  const sourceCode = `(${"\n"}${func.toString().replace(/\{.*/s, '{ }')}${"\n"})`
  const ast = parse(sourceCode)

  return ast
    .program
    .body[0]
    .expression
    .params
    .map(node => node.name || maybe(node.left).name || `...${maybe(node.argument).name}`)
}
