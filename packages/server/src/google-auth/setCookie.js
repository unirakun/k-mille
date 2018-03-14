const fetch = require('node-fetch')

module.exports = ({ oAuth2 }) => async (ctx) => {
  const { tokens } = await oAuth2.getToken(ctx.query.code)

  const raw = await fetch(
    'https://www.googleapis.com/plus/v1/people/me',
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    },
  )
  const profile = await raw.json()

  ctx.cookies.set(
    'profile',
    JSON.stringify({
      tokens,
      name: profile.name.givenName.toLowerCase(),
      avatar: profile.image.url,
      id: profile.id,
    }),
    {
      expires: new Date(tokens.expiry_date),
      overwrite: true,
      httpOnly: false,
    },
  )

  ctx.redirect('/')
}
