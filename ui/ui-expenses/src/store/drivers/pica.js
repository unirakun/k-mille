/* eslint-env browser */
import pica from 'pica/dist/pica'

const makeCanvas = (img, coeff = 1) => {
  const canvas = window.document.createElement('canvas')
  canvas.width = img.width / coeff
  canvas.height = img.height / coeff
  return canvas
}

const resizeImg = img => new Promise(async (resolve, reject) => {
  // Create an abstract canvas and get context
  const canvas = makeCanvas(img)
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

const resizeFile = file => new Promise((resolve, reject) => {
  // Create an image
  const img = window.document.createElement('img')
  img.src = window.URL.createObjectURL(file)
  // Once the image loads, render the img on the canvas
  img.onload = async () => {
    const { width, height } = img
    // if image it's too small, coeff is reduced
    const coeff = Math.min(Math.max(width, height), 1000) * (2 / 1000)
    // Create an abstract canvas and get context
    const canvas = makeCanvas(img, coeff)
    // Draw the image
    canvas.getContext('2d').drawImage(img, 0, 0, width / coeff, height / coeff)

    // Execute callback with the base64 URI of the image
    const image = await resizeImg(canvas)
    resolve(image)
  }
  img.onerror = reject
})

export default {
  getDriver: () => ({
    resize: resizeFile,
  }),
}
