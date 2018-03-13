const pdf = require('./pdf')
const store = require('./store')
const sheet = require('./sheet')

module.exports = async (ctx) => {
  const doc = pdf(ctx)
  const id = await store(doc)(ctx)
  await sheet(id)(ctx)

  ctx.response.status = 200
}
