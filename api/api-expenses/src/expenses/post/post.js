const util = require('util')
const { google } = require('googleapis')
const format = require('date-fns/format')

const append = util.promisify(google.sheets('v4').spreadsheets.values.append)

module.exports = async (ctx) => {
  const { auth } = ctx.state
  const expense = ctx.request.body
  const {
    fileId,
    user,
    context,
    price,
    taxe,
    needRefund,
  } = expense

  const resource = {
    values:
      [
        [
          JSON.stringify({ ...expense, sent: false }),
          format(Date.now(), 'YYYY/MM/DD'),
          'Description', // TODO
          user,
          context,
          price,
          taxe,
          needRefund ? 'yes' : 'no',
          `https://drive.google.com/file/d/${fileId}/view`,
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
