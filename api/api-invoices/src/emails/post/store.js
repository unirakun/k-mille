const util = require('util')
const { google } = require('googleapis')

const get = util.promisify(google.drive('v3').files.get)

const getData = fileId => ctx => new Promise((resolve, reject) => {
  const { auth } = ctx.state

  google
    .drive({ version: 'v3', encoding: null })
    .files
    .get(
      {
        auth,
        fileId,
        alt: 'media',
      },
      { responseType: 'stream' },
      (err, res) => {
        if (err) {
          reject(err)
          return
        }

        const chunks = []
        res.data.on('data', chunk => chunks.push(chunk))
        res.data.on('end', () => {
          resolve(Buffer.concat(chunks))
        })
      },
    )
})

module.exports = async (ctx) => {
  const { auth } = ctx.state
  const { fileId } = ctx.request.body

  return Promise.all([
    get({
      auth,
      fileId,
    }),
    getData(fileId)(ctx),
    getData(process.env.GOOGLE_DRIVE_IBAN_FILEID)(ctx),
  ]).then(([info, data, iban]) => ({
    invoice: { ...info.data, data },
    iban: { mimeType: 'application/pdf', name: 'rib-alakarte.pdf', data: iban },
  }))
}
