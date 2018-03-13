const util = require('util')
const { google } = require('googleapis')
const format = require('date-fns/format')

const append = util.promisify(google.sheets('v4').spreadsheets.values.append)

module.exports = async (ctx) => {
  const { auth } = ctx.state
  const expense = ctx.request.body
  const {
    client,
    price,
    fileId,
    user,
    needRefund,
  } = expense

  const resource = {
    values:
      [
        [
          format(Date.now(), 'YYYY/MM/DD'),
          client,
          'Description', // TODO
          user,
          price,
          needRefund ? 'yes' : 'no',
          `https://drive.google.com/file/d/${fileId}/view`,
          JSON.stringify(expense),
        ],
      ],
  }

  await append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    valueInputOption: 'USER_ENTERED',
    resource,
    range: 'Expenses!A3:D',
    auth,
  })

  ctx.response.status = 200
}
