import { getArguments } from './getArguments'
import { getAllFunctions } from './getAllFunctions'

const NORMAL_PARAMETER = 0
const REST_PARAMETER = 1
const MISSING_PARAMETER = 2

/**
 * Tests whether or not object has the same function signatures as Interface.
 * @param {Object} object
 * @param {Function} Interface
 * @returns {boolean} true if object implements Interface
 * @throws Will throw an error with a descriptive message if object does not implement Interface.
 */
export function implementsInterface (object, Interface) {
  const interfacePrototype = Interface.prototype

  const interfaceMethodNames = getAllFunctions(interfacePrototype)
    .filter(methodName => methodName !== 'constructor')
  const methodNamesOnObject = getAllFunctions(object)

  const missingMethodNamesOnObject = interfaceMethodNames
    .filter(methodName => !methodNamesOnObject.includes(methodName))

  if (missingMethodNamesOnObject.length > 0) {
    const missingMethodsString = `${missingMethodNamesOnObject.join(', ')}`
    throw new Error(
      `object does not implement ${Interface.name} because it is missing the following methods: ${missingMethodsString}.`
    )
  }

  let result = true
  for (const methodName of interfaceMethodNames) {
    const actualInterfaceArgumentNames = getArguments(interfacePrototype[methodName])
    const actualObjectArgumentNames = getArguments(object[methodName])

    const interfaceArgumentNames = [].concat(actualInterfaceArgumentNames)
    const objectArgumentNames = [].concat(actualObjectArgumentNames)

    console.log(interfaceArgumentNames, objectArgumentNames)

    // Ensure length of both arrays are the same.
    while (interfaceArgumentNames.length < objectArgumentNames.length) {
      interfaceArgumentNames.push(void 0)
    }
    while (objectArgumentNames.length < interfaceArgumentNames.length) {
      objectArgumentNames.push(void 0)
    }

    const argumentMatches = interfaceArgumentNames
      .map((arg, index) => ({ interface: arg, object: objectArgumentNames[index] }))
      .map(function (arg) {
        if (arg.interface) {
          arg.interfaceDescription = arg.interface.startsWith('...') ? REST_PARAMETER : NORMAL_PARAMETER
        } else {
          arg.interfaceDescription = MISSING_PARAMETER
        }

        if (arg.object) {
          arg.objectDescription = arg.object.startsWith('...') ? REST_PARAMETER : NORMAL_PARAMETER
        } else {
          arg.objectDescription = MISSING_PARAMETER
        }

        return arg
      })
      .map(arg => arg.interfaceDescription === arg.objectDescription)

    const signatureMatches = argumentMatches.reduce((last, current) => last && current, true)

    if (!signatureMatches) {
      if (result === true) {
        result = []
      }

      const objectSignature = `object.${methodName}(${actualObjectArgumentNames.join(', ')})`
      const interfaceSignature = `${Interface.name}.${methodName}(${actualInterfaceArgumentNames.join(', ')})`
      result.push(
        // eslint-disable-next-line quotes
        `${objectSignature} does not match the interface signature ${interfaceSignature}.`
      )
    }
  }

  if (result !== true) {
    // eslint-disable-next-line quotes
    throw new Error(result.join("\n"))
  }

  return true
}
