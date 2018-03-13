const fetch = require('node-fetch')

const MATCH_PRICES = /(\d+) ?[,.] ?(\d*)/g

module.exports = async (ctx) => {
  const { body: { image } } = ctx.request

  // send it to google
  const post = {
    requests: {
      image: {
        content: image,
      },
      features: [
        {
          type: 'DOCUMENT_TEXT_DETECTION',
        },
      ],
    },
  }

  const raw = await fetch(
    `https://content-vision.googleapis.com/v1p1beta1/images:annotate?alt=json&key=${process.env.GOOGLE_VISION_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify(post),
    },
  )

  // converting data to JS object...
  const response = await raw.json()
  if (response.error) {
    throw new Error(JSON.stringify(response.error, null, 2))
  }
  const fulltext = response.responses[0].fullTextAnnotation.text

  // retrieving prices...
  let array
  const prices = []
  while (array = MATCH_PRICES.exec(fulltext)) { // eslint-disable-line no-cond-assign
    const first = array[1]
    const second = array[2] || '00'

    const price = Number.parseFloat(`${first}.${second}`, 10)
    prices.push(price)
  }

  prices.sort((a, b) => b - a)

  return prices
}
