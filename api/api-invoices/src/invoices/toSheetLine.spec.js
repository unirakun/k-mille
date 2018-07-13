/* eslint-env jest */
const toSheetLine = require('./toSheetLine')

describe('toSheetLine', () => {
  const baseInvoice = {
    client: {
      name: 'client-name',
      city: 'client-city',
      address: 'client-address',
    },
    dates: {
      end: 1522620000000,
      print: 1531472327262,
    },
    lines: [
      {
        title: '2',
        nb: '10',
        pricePerUnit: '100',
      },
    ],
    id: '00006',
    timetable: [],
    fileId: '1xm33aSYp62yAxht0a5f-0kw7hTX_z3I5',
    ranges: [
      7,
    ],
  }

  const baseInvoiceWithTimetable = Object.assign(
    {},
    baseInvoice,
    {
      timetable: [
        {
          date: '2018-03-01',
          price: '133',
        },
        {
          date: '2018-04-01',
          price: '123',
          paid: true,
        },
      ],
      ranges: [
        7,
        8,
      ],
    },
  )

  it('should parse a simple invoice -modification-', () => {
    const invoice = Object.assign({}, baseInvoice, { paid: true })

    expect(toSheetLine(invoice)).toMatchSnapshot()
  })

  it('should parse a timetable invoice -modification-', () => {
    const invoice = Object.assign({}, baseInvoiceWithTimetable)

    expect(toSheetLine(invoice)).toMatchSnapshot()
  })

  it('should parse a timetable invoice -creation-', () => {
    const invoice = Object.assign({}, baseInvoiceWithTimetable)
    delete invoice.ranges

    expect(toSheetLine(invoice)).toMatchSnapshot()
  })

  it('should parse a simple invoice -creation-', () => {
    const invoice = Object.assign({}, baseInvoice)
    delete invoice.ranges

    expect(toSheetLine(invoice)).toMatchSnapshot()
  })
})
