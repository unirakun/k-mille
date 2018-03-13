const { send } = require('utils-email')

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

module.exports = attachments => (ctx) => {
  const { id, client, lines } = ctx.request.body
  const total = lines
    .map(({ nb, pricePerUnit }) => ((nb * pricePerUnit) * 1.2 /* TVA */))
    .reduce(
      (acc, curr) => acc + curr,
      0,
    )

  const cc = [
    {
      email: 'fabien.juif@alakarte.io',
      name: 'Fabien JUIF',
    },
    {
      email: 'guillaume.crespel@alakarte.io',
      name: 'Guillaume CRESPEL',
    },
  ]

  const toAccountant = send({
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

  const toClient = send({
    from: {
      email: 'facturation@alakarte.io',
      name: 'alakarte - facturation',
    },
    to: client.emails.map(email => ({ email })),
    cc,
    subject: `alakarte / ${client.name} / facture ${id}`,
    text: `Veuillez trouver en PJ la facture ${id}, et notre RIB au format PDF. Un versement sous 10 jours ouvrés est attendu.`,
    html: `<html>
      Bonjour,<br />
      <br />
      Veuillez trouver en PJ:<ul>
        <li>La facture ${id} d'un montant de ${FORMATTER.format(total)} TTC.</li>
        <li>Le RIB pour effectuer le versement</li>
      </ul>
      <br />
      Merci de bien vouloir accuser réception de ce courriel.<br />
      Un versement sous 10 jours ouvrés est attendu.<br />
      <br />
      Cordialement,<br />
      alakarte
    </html>`,
    attachments,
  })

  return Promise.all([toAccountant, toClient])
}
