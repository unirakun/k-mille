const util = require('util')
const { google } = require('googleapis')
const format = require('date-fns/format')
const max = require('date-fns/max')

const append = util.promisify(google.sheets('v4').spreadsheets.values.append)

const toSheet = ({ body, fileId }) => ({
  name,
  id,
  date,
  price,
}) => [
  name,
  id.includes('draft-') ? id : Number.parseInt(id, 10),
  format(date, 'YYYY/MM/DD'),
  Number.parseFloat(price, 10),
  'non',
  `https://drive.google.com/file/d/${fileId}/view`,
  JSON.stringify({ ...body, fileId }),
]

module.exports = fileId => async (ctx) => {
  const { auth } = ctx.state
  const { body } = ctx.request
  const {
    client,
    id,
    dates,
    lines,
    timetable,
  } = body

  const toSheetImpl = toSheet({ body, fileId })

  let sheetLines = timetable.map(line => toSheetImpl({ ...line, name: client.name, id }))
  if (!timetable || timetable.length === 0) {
    const total = lines.reduce(
      (acc, { nb, pricePerUnit }) => acc + (nb * pricePerUnit * 1.2),
      0,
    )

    sheetLines = [toSheetImpl({
      name: client.name, id, date: max(...Object.values(dates)), price: total,
    })]
  }

  const resource = {
    values: [...sheetLines],
  }

  await append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    valueInputOption: 'RAW',
    resource,
    range: 'Factures!A2:D',
    auth,
  })
}
