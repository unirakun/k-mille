module.exports = ({ scope, oAuth2 }) => (ctx) => {
  const url = oAuth2.generateAuthUrl({
    access_type: 'online',
    scope,
  })

  ctx.redirect(url)
}
