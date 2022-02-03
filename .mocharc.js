'use strict'

module.exports = {
  require: ['sinon', 'supertest'],
  recursive: true,
  exit: true,
  spec: ['test/**/*.spec.js']
}

// # mocha.opts
//   --require supertest
//   --timeout 120000
//   --exit
//   ./test/**/*.spec.js