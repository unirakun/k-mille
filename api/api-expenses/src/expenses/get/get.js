const service = require('./service')

module.exports = async (ctx) => {
  ctx.body = await service.get(ctx)
}
