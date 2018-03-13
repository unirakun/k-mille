const GET = require('./get')
const POST = require('./post')

module.exports = {
  GET,
  POST,
  regexps: [
    /^\/api\/expenses$/,
  ],
}
