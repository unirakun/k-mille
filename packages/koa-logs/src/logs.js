module.exports = () => async (ctx, next) => {
  const { method, url } = ctx.request

  console.log(`${method} | ${url}`)

  await next()
}
