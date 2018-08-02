import pica from 'pica/dist/pica'


const makeCanvas = ({ window }) => (img, coeff = 1) => {
  const canvas = window.document.createElement('canvas')
  canvas.width = img.width / coeff
  canvas.height = img.height / coeff
  return canvas
}


const resizeImg = ({ window }) => img => new Promise((resolve, reject) => {
  const picaRunner = pica()
  // Create an abstract canvas and get context
  const canvas = makeCanvas({ window })(img)
  picaRunner.resize(img, canvas)
    .then(result => picaRunner.toBlob(result, 'image/jpeg'))
    .then((blob) => {
      const reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onload = readerE => resolve(readerE.target.result)
      reader.onerror = reject
    })
})

const resizeFile = ({ window }) => (file, coeff = 1) => new Promise((resolve, reject) => {
  // Create an image
  const img = window.document.createElement('img')
  img.src = window.URL.createObjectURL(file)
  // Once the image loads, render the img on the canvas
  img.onload = async () => {
    const { width, height } = img
    // if image it's too small, coeff is reduced
    const adjustCoeff = Math.min(Math.max(width, height), 1000) * (coeff / 1000)
    // Create an abstract canvas and get context
    const canvas = makeCanvas({ window })(img, adjustCoeff)
    // Draw the image
    canvas.getContext('2d').drawImage(img, 0, 0, width / adjustCoeff, height / adjustCoeff)

    // Execute callback with the base64 URI of the image
    const image = await resizeImg({ window })(canvas)
    resolve(image)
  }
  img.onerror = reject
})

export const load = (action, store, { http }) => {
  http('EXPENSES').get('/api/expenses')
}

export const submit = async ({ payload }, store, drivers) => {
  const image = await resizeFile(drivers)(payload, 2)
  store.dispatch({ type: '@@ui/IMAGE_RESIZED', payload: image })
}

export const postImage = ({ payload }, store, { http }) => {
  http('IMAGES').post('/api/images', {
    image: payload.replace(/data:.*;base64,/, ''),
    user: store.data.profile.get().name,
  })
}

export const setExpenses = ({ payload }, store) => {
  // set id
  const expenses = payload
    .map(expense => ({ ...expense, id: expense.ranges[0] }))
    .sort((cur, next) => next.date - cur.date)

  // data
  store.data.expenses.set(expenses)

  // keys to print
  const toPrint = expenses
    .filter(expense => !expense.sent)
    .map(expense => expense.id)
  store.ui.list.set(toPrint)
}

export const goToCreate = (action, store, { router }) => {
  router.push('/expense')
}

export const setPrices = ({ payload }, store) => {
  store.data.prices.set(payload.prices)
  store.ui.header.set({ title: 'ajout' })
  store.data.fileId.set(payload.fileId)
}

export const sendEmails = (action, store, { http }) => {
  http('EMAILS').post('/api/emails')
}

export const setEmails = ({ payload }, store) => {
  store.data.emails.set(payload)
}
