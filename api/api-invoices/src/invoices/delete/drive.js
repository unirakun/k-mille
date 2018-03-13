const util = require('util')
const { google } = require('googleapis')

const drive = google.drive('v3')
const googleDelete = util.promisify(drive.files.delete)

module.exports = async (ctx) => {
  const { auth } = ctx.state
  const { fileId } = ctx.request.body

  await googleDelete({
    auth,
    fileId,
  })
}
