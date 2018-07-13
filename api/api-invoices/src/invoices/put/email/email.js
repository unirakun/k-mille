const store = require('./store')
const send = require('./send')

module.exports = async (ctx) => {
  const { invoice, iban } = await store(ctx)
  await send([invoice, iban])(ctx)

  ctx.response.status = 200
}
