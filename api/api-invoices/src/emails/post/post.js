const store = require('./store')
const email = require('./email')

module.exports = async (ctx) => {
  const doc = await store(ctx)
  await email(doc)(ctx)

  ctx.response.status = 200
}
