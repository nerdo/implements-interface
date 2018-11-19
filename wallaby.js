module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      '!src/**/__tests__/*.js',
      '!src/**/*.test.js'
    ],

    tests: [
      'src/**/__tests__/*.js',
      'src/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    setup: function (wallaby) {
      var jestConfig = require('./package.json').jest
      wallaby.testFramework.configure(jestConfig)
    }
  }
}
