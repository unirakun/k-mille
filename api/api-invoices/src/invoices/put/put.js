const util = require('util')
const { google } = require('googleapis')
const toSheetLine = require('../toSheetLine')

const update = util.promisify(google.sheets('v4').spreadsheets.values.update)


module.exports = async (ctx) => {
  const { auth } = ctx.state
  const invoice = ctx.request.body
  const { ranges } = invoice

  const lines = toSheetLine(invoice)

  await Promise.all(ranges.map((range, index) => (
    update({ // eslint-disable-line no-await-in-loop
      auth,
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      valueInputOption: 'RAW',
      range: `Factures!A${range}:G`,
      resource: {
        values: [lines[index]],
      },
    })
  )))

  ctx.response.status = 200
}