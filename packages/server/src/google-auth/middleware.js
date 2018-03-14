const { google } = require('googleapis')
const redirect = require('./redirect')
const setCookie = require('./setCookie')
const permissions = require('./permissions')

module.exports = ({ scope, keys }) => {
  const oAuth2 = new google.auth.OAuth2(...keys)

  return async (ctx, next) => {
    const { url } = ctx.request

    if (/^\/api\/auth$/.test(url)) {
      await redirect({ scope, oAuth2 })(ctx)
      return
    }

    if (/^\/api\/auth\/google\/callback\?code=.*$/.test(url)) {
      await setCookie({ oAuth2 })(ctx)
      return
    }

    await permissions({ oAuth2 })(ctx, next)
  }
}
