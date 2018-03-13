const fs = require('fs')
const { send } = require('utils-email')

module.exports = doc => (ctx) => {
  const { name, mimeType } = doc

  return send({
    from: {
      email: 'facturation@alakarte.io',
      name: 'alakarte - facturation',
    },
    to: {
      email: 'fabien.juif@gmail.com',
    },
    cc: [
      {
        email: 'fabien.juif@alakarte.io',
        name: 'Fabien JUIF',
      },
      {
        email: 'guillaume.crespel@alakarte.io',
        name: 'Guillaume CRESPEL',
      },
    ],
    subject: 'Complex',
    text: 'Veuillez trouver en PJ la facture blabla, et notre RIB au format PDF. Un versement sous 10 jours ouvrés et attendu.',
    html: `<html>
      Bonjour,<br />
      <br />
      Veuillez trouver en PJ:<ul>
        <li>La facture blabla d'un montant de blibli € HT.</li>
        <li>Le RIB pour effectuer le versement</li>
      </ul>
      <br />
      Merci de bien vouloir accuser réception de ce courriel.<br />
      <br />
      Cordialement,<br />
      alakarte
    </html>`,
    attachments: [doc],
  })
}
