const util = require('util')
const { google } = require('googleapis')

const deleteFile = util.promisify(google.drive('v3').files.delete)

module.exports = async (ctx) => {
  const { url } = ctx.request
  const { auth } = ctx.state
  const fileId = url.replace('/api/images/', '')

  const response = await deleteFile({ fileId, auth })
  if (response.error) {
    throw new Error(JSON.stringify(response.error, null, 2))
  }

  ctx.status = 200
}
