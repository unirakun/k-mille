/* eslint-env browser */
import pica from 'pica/dist/pica'

const makeReducingCanvas = (img, coeff = 1) => {
  const { width, height } = img
  // if image it's too small, coeff is reduced
  const coeffAdjusted = Math.min(Math.max(width, height), 1000) * (coeff / 1000)
  // make canvas with reduced size
  const canvas = window.document.createElement('canvas')
  canvas.width = width / coeffAdjusted
  canvas.height = height / coeffAdjusted
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

const reduceImg = (img, coeff) => new Promise(async (resolve, reject) => {
  // Create an abstract resizing canvas
  const canvas = makeReducingCanvas(img, coeff)
  // zip image
  const picaRunner = pica()
  const result = await picaRunner.resize(img, canvas)
  const blob = await picaRunner.toBlob(result, 'image/jpeg')
  // Blob to file
  const reader = new window.FileReader()
  reader.readAsDataURL(blob)
  reader.onload = readerE => resolve(readerE.target.result)
  reader.onerror = reject
})

const reduce = store => (file, coeff) => new Promise(async (resolve) => {
  // Create an image with input file
  const img = window.document.createElement('img')
  img.src = window.URL.createObjectURL(file)
  // Once the image loads, render the image on the canvas
  img.onload = async () => {
    // Execute callback with the base64 URI of the image
    const image = (await reduceImg(img, coeff)).replace(/data:.*;base64,/, '')
    // send an event with reduced image
    store.dispatch({ type: '@@pica/IMAGE_REDUCED', payload: image })
    // return the reduced image
    resolve(image)
  }
  img.onerror = error => store.dispatch({ type: '@@pica/IMAGE_REDUCED>ERROR', payload: error })
})

export default {
  getDriver: store => ({
    reduce: reduce(store),
  }),
}
