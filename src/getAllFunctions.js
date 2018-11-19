/**
 * Gets all functions of an object throughout the prototype chain.
 * Based on https://stackoverflow.com/a/31055217/2057996
 * @param {Object} obj
 * @returns {Array}
 */
export function getAllFunctions (obj) {
  let props = []

  let nextObj = obj
  while (nextObj && nextObj !== Object.prototype) {
    props = props.concat(Object.getOwnPropertyNames(nextObj))
    nextObj = Object.getPrototypeOf(nextObj)
  }

  return props
    .sort() // sorted for unique filter (e !== arr[i + 1]) below
    .filter((e, i, arr) => e !== arr[i + 1] && typeof obj[e] === 'function')
}
