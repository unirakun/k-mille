const POST = require('./post')
const DELETE = require('./delete')

module.exports = {
  POST,
  DELETE,
  regexps: [
    /^\/api\/images$/,
    /^\/api\/images\/.*$/,
  ],
}
