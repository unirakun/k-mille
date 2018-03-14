/* eslint-disable global-require */
const Koa = require('koa')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const compress = require('koa-compress')
const googleAuth = require('./google-auth')
const logs = require('./logs')

module.exports = ({
  scope,
  resources,
} = {}) => {
  const app = new Koa()

  if (process.env.NODE_ENV === 'production') {
    app.use(serve('../build', { gzip: true, br: true }))
  } else {
    const proxy = require('koa-proxy')

    app.use(proxy({
      host: 'http://localhost:3000',
      match: /^(?!\/api.*\/.*)/,
      ws: true,
    }))
  }

  app.use(logs())
  app.use(conditional())
  app.use(etag())
  app.use(compress())
  app.use(bodyParser())
  app.use(googleAuth({
    scope,
    keys: [
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET,
      process.env.GOOGLE_AUTH_REDIRECT,
    ],
  }))

  app.use(async (ctx) => {
    const { url, method } = ctx.request

    try {
      // permissions are ok, call api
      const resource = resources.find(r => r.regexps.find(reg => reg.test(url)))
      if (resource && resource[method]) {
        await resource[method](ctx)
        return
      }

      // route not found
      ctx.response.status = 404
    } catch (ex) {
      console.error(ex) // eslint-disable-line no-console
      ctx.response.status = 500
    }
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`) // eslint-disable-line no-console
  })
}
