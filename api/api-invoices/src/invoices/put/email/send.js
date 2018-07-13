const { send } = require('utils-email')

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

module.exports = attachments => (ctx) => {
  const { id, lines } = ctx.request.body
  const total = lines
    .map(({ nb, pricePerUnit }) => ((nb * pricePerUnit) * 1.2 /* TVA */))
    .reduce(
      (acc, curr) => acc + curr,
      0,
    )

  const cc = [
    {
      email: 'facturation@alakarte.io',
      name: 'alakarte - facturation',
    },
  ]

  return send({
    from: {
      email: 'facturation@alakarte.io',
      name: 'alakarte - facturation',
    },
    to: [{ email: process.env.ACCOUNTANT_EMAIL }],
    cc,
    subject: process.env.ACCOUNTANT_EMAIL_SUBJECT_INVOICES,
    text: `En PJ : la facture ${id} d'un montant de ${FORMATTER.format(total)} TTC`,
    attachments: [attachments[0]],
  })
}
