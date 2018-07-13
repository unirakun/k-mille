/* eslint-disable prefer-destructuring */
const { omit } = require('lodash')
const format = require('date-fns/format')

const toLine = (invoice, isTimetable, index) => {
  const newInvoice = omit(invoice, ['ranges'])
  const name = invoice.client.name
  const id = invoice.id.includes('draft-') ? invoice.id : Number.parseInt(invoice.id, 10)
  const url = `https://drive.google.com/file/d/${invoice.fileId}/view`
  let paid
  let date
  let price

  if (isTimetable) {
    const timetable = invoice.timetable[index]

    paid = timetable.paid
    date = timetable.date
    price = timetable.price
  } else {
    paid = invoice.paid
    date = invoice.dates.print
    price = invoice.lines.reduce(
      (acc, { nb, pricePerUnit }) => acc + (nb * +pricePerUnit), // TODO: price per unit should be a number in raw data
      0,
    )
  }

  // format
  date = format(date, 'YYYY/MM/DD')
  paid = paid ? 'oui' : 'non' // TODO: english
  price = Number.parseFloat(price, 10) // TODO: convert to number is raw data

  return [
    JSON.stringify(newInvoice),
    name,
    id,
    date,
    price,
    paid,
    url,
  ]
}

module.exports = (invoice) => {
  const { ranges, timetable } = invoice
  const isTimetable = (timetable && timetable.length > 0)

  const lines = ranges || (isTimetable ? timetable : [0]) // [0] is for creation without timetable purpose

  return lines.map((_, index) => toLine(invoice, isTimetable, index))
}
