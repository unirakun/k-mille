const mailjet = require ('node-mailjet')

const server = mailjet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

module.exports = {
  send: ({ from, to, cc, subject, text, html, attachments }) => server
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: from.email,
            Name: from.name
          },
          To: [{
            Email: to.email,
            Name: to.name,
          }],
          Cc: cc.map(({ email, name }) => ({
            Email: email,
            Name: name,
          })),
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
          Attachments: attachments.map(({ mimeType, name, data }) => {
            console.log(data.toString('base64').substring(0, 200))
            return {
              ContentType: mimeType,
              Filename: name,
              Base64Content: data.toString('base64'),
            }
          }),
        },
      ],
    }),
}
