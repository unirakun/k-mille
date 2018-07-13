const POST = require('./post')
const GET = require('./get')
const DELETE = require('./delete')
const PUT = require('./put')

module.exports = {
  POST,
  GET,
  DELETE,
  PUT,
  regexps: [
    /^\/api\/invoices$/,
  ],
}
