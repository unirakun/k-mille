/* eslint-env browser */
import pica from 'pica/dist/pica'

const makeReducingCanvas = (img) => {
  const { width, height } = img
  // reduce image by coeff 2.
  const COEFF = 2
  // but if image it's too small, coeff is reduced
  const MIN_SIZE = 2000
  const coeffAdjusted = Math.max(width, height, MIN_SIZE) * (COEFF / MIN_SIZE)
  // make canvas with reduced size
  const canvas = window.document.createElement('canvas')
  canvas.width = width / coeffAdjusted
  canvas.height = height / coeffAdjusted
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

const reduceImg = img => new Promise(async (resolve, reject) => {
  // Create an abstract resizing canvas
  const canvas = makeReducingCanvas(img)
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

const reduce = store => (file) => {
  // Create an image with input file
  const img = window.document.createElement('img')
  img.src = window.URL.createObjectURL(file)
  // Once the image loads, render the image on the canvas
  img.onload = async () => {
    // Execute callback with the base64 URI of the image
    const image = (await reduceImg(img)).replace(/data:.*;base64,/, '')
    // send an event with reduced image
    store.dispatch({ type: '@@image/IMAGE_REDUCED', payload: image })
  }
  img.onerror = error => store.dispatch({ type: '@@image/IMAGE_REDUCED>ERROR', payload: error })
}

export default {
  getDriver: store => ({
    reduce: reduce(store),
  }),
}
