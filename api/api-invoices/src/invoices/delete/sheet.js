const util = require('util')
const { google } = require('googleapis')
const format = require('date-fns/format')
const max = require('date-fns/max')

const batchClear = util.promisify(google.sheets('v4').spreadsheets.values.batchClear)

module.exports = async (ctx) => {
  const { auth } = ctx.state
  const { ranges } = ctx.request.body

  await batchClear({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    ranges: ranges.map(range => `Factures!A${range}:G${range}`),
  })
}
