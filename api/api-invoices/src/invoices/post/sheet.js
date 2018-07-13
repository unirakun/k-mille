const util = require('util')
const { google } = require('googleapis')
const toSheetLine = require('../toSheetLine')

const append = util.promisify(google.sheets('v4').spreadsheets.values.append)

module.exports = fileId => async (ctx) => {
  const { auth } = ctx.state
  const { body } = ctx.request

  await append({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    valueInputOption: 'RAW',
    range: 'Factures!A2:G',
    resource: {
      values: toSheetLine(Object.assign({}, body, { fileId })),
    },
  })
}
