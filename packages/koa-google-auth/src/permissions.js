const util = require('util')
const { google } = require('googleapis')
const cache = require('utils-cache')({ name: 'permissions' })

const get = util.promisify(google.plus('v1').people.get)

const checkPermissions = async (ctx) => {
  const { auth, profile = {} } = ctx.state
  const { credentials } = auth

  const validated = cache.get(credentials)
  if (validated !== undefined) return validated

  console.log(`[koa-google-auth] getting google profile of ${profile.name} (${profile.id})`) // eslint-disable-line no-console
  const raw = await get({ userId: 'me', auth })
  const googleProfile = raw.data

  if (googleProfile.error && googleProfile.error.code !== 401) {
    throw new Error(googleProfile.error.message)
  }

  return cache.add(credentials, [process.env.FABIEN_ID, process.env.GUILLAUME_ID].includes(googleProfile.id))
}

module.exports = ({ oAuth2 }) => async (ctx, next) => {
  const { cookie = '' } = ctx.request.headers
  const profileString = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('profile='))
  const profile = (profileString || '').replace('profile=', '')

  if (!profile) {
    console.error('[koa-google-auth] no cookie') // eslint-disable-line no-console
    ctx.response.status = 401
    return
  }

  const { tokens, id, name } = JSON.parse(profile)

  if (!tokens) {
    console.error('[koa-google-auth] no tokens in cookies') // eslint-disable-line no-console
    ctx.response.status = 401
    return
  }

  const auth = oAuth2
  auth.credentials = tokens
  ctx.state.auth = auth
  ctx.state.profile = { id, name }

  if (!await checkPermissions(ctx)) {
    ctx.response.status = 401
    return
  }

  await next()
}
