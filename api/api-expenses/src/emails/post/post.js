const util = require('util')
const { google } = require('googleapis')
const format = require('date-fns/format')
const { send } = require('utils-email')
const service = require('../../expenses/get/service')
const getData = require('./getData')

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const update = util.promisify(google.sheets('v4').spreadsheets.values.update)

const sendExpense = ctx => async (expense) => {
  const resource = {
    values: [
      [
        JSON.stringify({ ...expense, sent: true }),
      ],
    ],
  }

  await send({
    from: {
      email: 'achat@alakarte.io',
      name: 'alakarte - achat',
    },
    to: [{ email: process.env.ACCOUNTANT_EMAIL }],
    subject: process.env.ACCOUNTANT_EMAIL_SUBJECT_EXPENSES,
    text: `
  - Date : ${format(expense.date, 'DD/MM/YYYY')}
  - NDF : ${expense.needRefund && `oui (${expense.user})`}
  - Montant : ${FORMATTER.format(expense.price)} TTC
  - TVA : ${(expense.taxe * 100).toFixed(2)}%
    `,
    attachments: [{
      mimeType: 'image/jpeg',
      name: `depense-${expense.date}.jpeg`,
      data: await getData(expense.fileId)(ctx),
    }],
  })

  return update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    valueInputOption: 'USER_ENTERED',
    resource,
    range: `Expenses!A${expense.ranges[0]}:A${expense.ranges[0]}`,
    auth: ctx.state.auth,
  })
}

module.exports = async (ctx) => {
  const expenses = await service.get(ctx)
  const expensesToSend = expenses.filter(expense => !expense.sent)

  const res = await Promise.all(expensesToSend.map(sendExpense(ctx)))

  console.log({ res })

  ctx.body = {
    ok: res.filter(r => r.status === 200).length,
    ko: res.filter(r => r.status !== 200).map(r => r.statusText),
  }

  // ctx.body = values
  // ctx.response.status = 200
}
