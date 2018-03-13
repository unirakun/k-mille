const uniq = require('lodash/uniq')
const upload = require('./upload')
const ocr = require('./ocr')

module.exports = async (ctx) => {
  const [fileId, prices] = await Promise.all([upload(ctx), ocr(ctx)])

  // response
  ctx.body = {
    prices: uniq(prices.splice(0, 3)),
    fileId,
  }
}
