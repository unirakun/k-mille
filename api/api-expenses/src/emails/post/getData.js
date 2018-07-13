const { google } = require('googleapis')

// TODO: factorize with invoices
module.exports = fileId => ctx => new Promise((resolve, reject) => {
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
