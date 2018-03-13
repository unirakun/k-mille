const streamifier = require('streamifier')
const util = require('util')
const { google } = require('googleapis')

const create = util.promisify(google.drive('v3').files.create)

const upload = async (ctx) => {
  const { user, image } = ctx.request.body
  const { auth } = ctx.state

  const resource = {
    name: `${user}_${Date.now()}.jpg`,
    parents: [process.env.GOOGLE_DRIVE_EXPENSES_FILES_FOLDER],
  }

  const media = {
    mimeType: 'image/jpg',
    body: streamifier.createReadStream(Buffer.from(image, 'base64')),
  }

  const file = await create({
    auth,
    resource,
    media,
    fields: 'id',
  })

  return file.data.id
}

module.exports = upload
