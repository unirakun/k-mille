const { groupBy, flatten } = require('lodash')
const util = require('util')
const { google } = require('googleapis')

const get = util.promisify(google.sheets('v4').spreadsheets.values.get)

module.exports = async (ctx) => {
  const { auth } = ctx.state

  const response = await get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Factures!G7:G1000', // before line 7 we don't store JSON (first version)
    valueRenderOption: 'UNFORMATTED_VALUE',
    auth,
  })

  const values = (response.data.values || [])
    // json can be undefined when the line is cleared (with DELETE /api/invoices)
    // we don't use filter before map because index let us now the sheet line used by DELETE
    .map(([json], index) => (json ? { ...JSON.parse(json), ranges: [7 + index] } : undefined))
    // undefined lines (cleared invoices) are not returned
    .filter(Boolean)

  ctx.body = Object
    .values(groupBy(values, 'id'))
    .map(groupedValues => ({
      ...groupedValues[0],
      ranges: flatten(groupedValues.map(value => value.ranges)),
    }))
}
