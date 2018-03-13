const util = require('util')
const { google } = require('googleapis')

const get = util.promisify(google.sheets('v4').spreadsheets.values.get)

module.exports = async (ctx) => {
  const { auth } = ctx.state

  const response = await get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Factures!J2',
    valueRenderOption: 'UNFORMATTED_VALUE',
    auth,
  })

  ctx.body = response.data.values[0][0] // eslint-disable-line prefer-destructuring
}
