const util = require('util')
const { google } = require('googleapis')
const toSheetLine = require('../toSheetLine')
const email = require('./email')

const update = util.promisify(google.sheets('v4').spreadsheets.values.update)


module.exports = async (ctx) => {
  const { auth } = ctx.state
  const invoice = ctx.request.body
  const { ranges, timetable, paid } = invoice

  // save data to sheet
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

  // send email if
  // - the invoice is not a timetable and is paid
  // - or this is the first timetable to be paid
  if (
    ((!timetable || timetable.length <= 0) && paid)
    || (timetable.filter(t => t.paid).length === 1)
  ) await email(ctx)

  ctx.response.status = 200
}
