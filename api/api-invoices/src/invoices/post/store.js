const util = require('util')
const { google } = require('googleapis')

const create = util.promisify(google.drive('v3').files.create)

module.exports = doc => async (ctx) => {
  const { auth } = ctx.state
  const { client, dates } = ctx.request.body

  const resource = {
    name: `facture-${client.name}-${dates.print}.pdf`.toLowerCase(),
    parents: [process.env.GOOGLE_DRIVE_INVOICES_FILES_FOLDER],
  }

  const media = {
    mimeType: 'application/pdf',
    body: doc,
  }

  const file = await create({
    resource,
    media,
    fields: 'id',
    auth,
  })

  return file.data.id
}
