import { parse } from 'babylon'

const maybe = x => x || {} // optionals support

/**
 * Gets arguments for a function.
 * Based on https://stackoverflow.com/a/31055217/2057996
 * @param {Function} func
 * @returns {Array}
 */
export function getArguments (func) {
  const sanitizedToString = func
    .toString()
    .replace(/(?<!function)(?:\s+|^)([a-zA-Z0-9_]+)(?<!function)\s*(?=\()/, ' function $1 ')
    .replace(/\{\s*\[native code\]\s*\}\s*$/, '{ }')
  const sourceCode = `(${'\n'}${sanitizedToString}${'\n'})`
  const ast = parse(sourceCode)

  return ast
    .program
    .body[0]
    .expression
    .params
    .map(node => node.name || maybe(node.left).name || `...${maybe(node.argument).name}`)
}
