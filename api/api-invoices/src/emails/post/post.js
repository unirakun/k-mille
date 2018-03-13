const store = require('./store')
const email = require('./email')

module.exports = async (ctx) => {
  const { invoice, iban } = await store(ctx)
  await email([invoice, iban])(ctx)

  ctx.response.status = 200
}
