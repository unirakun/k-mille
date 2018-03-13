const POST = require('./post')
const GET = require('./get')
const DELETE = require('./delete')

module.exports = {
  POST,
  GET,
  DELETE,
  regexps: [
    /^\/api\/invoices$/,
  ],
}
