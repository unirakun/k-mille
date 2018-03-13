const sheet = require('./sheet')
const drive = require('./drive')

module.exports = async (ctx) => {
  const { auth } = ctx.state
  const { id } = ctx.request.body

  if (!id || !id.includes('draft')) {
    ctx.response.status = 400
    return
  }

  // remove sheet ranges
  await sheet(ctx)
  // remove pdf
  await drive(ctx)

  ctx.response.status = 200
}
