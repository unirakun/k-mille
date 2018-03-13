const util = require('util')
const { google } = require('googleapis')

const drive = google.drive('v3')
const create = util.promisify(drive.files.create)

module.exports = doc => async (ctx) => {
  const { client, id, dates, lines, timetable } = ctx.request.body
  const { auth } = ctx.state

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
