const util = require('util')
const { google } = require('googleapis')

const sheetsGet = util.promisify(google.sheets('v4').spreadsheets.values.get)

const get = async (ctx) => {
  const { auth } = ctx.state

  const response = await sheetsGet({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Expenses!A3:A1000',
    valueRenderOption: 'UNFORMATTED_VALUE',
  })

  return (response.data.values || [])
    // json can be undefined when the line is cleared (with DELETE /api/expenses)
    // we don't use filter before map because index let us now the sheet line used by DELETE
    .map(([json], index) => (json ? { ...JSON.parse(json), ranges: [3 + index] } : undefined))
    // undefined lines (cleared expenses) are not returned
    .filter(Boolean)
}

module.exports = {
  get,
}
