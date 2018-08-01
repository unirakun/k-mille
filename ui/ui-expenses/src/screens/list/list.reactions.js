import pica from 'pica/dist/pica'

export const load = (action, store, { http, window }) => {
  http('EXPENSES').get('/api/expenses')

  window.addEventListener('paste', async (pasteEvent) => {
    if (!pasteEvent || !pasteEvent.clipboardData || !pasteEvent.clipboardData.items) return

    const { items } = pasteEvent.clipboardData
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      // Skip content if not image
      if (item.type.indexOf("image") === -1) continue
      // get image as blob
      const image = await resizeFile(item.getAsFile())
      store.dispatch({ type: '@@ui/IMAGE_RESIZED', payload: image })
    }
  })
}

export const submit = async ({ payload }, store) => {
  const image = await resizeFile(payload)
  store.dispatch({ type: '@@ui/IMAGE_RESIZED', payload: image })
}

const makeCanvas = img => {
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  return canvas
}

const resizeFile = (file) => new Promise((resolve, reject) => {
  // Create an image
  const img = new Image()
  img.src = window.URL.createObjectURL(file)
  // Once the image loads, render the img on the canvas
  img.onload = async () => {
    // Create an abstract canvas and get context
    const canvas = makeCanvas(img)
    // Draw the image
    canvas.getContext('2d').drawImage(img, 0, 0)

    // Execute callback with the base64 URI of the image
    const image = await resizeImg(canvas)
    resolve(image)
  }
  img.onerror = reject
})

const resizeImg = img => new Promise((resolve, reject) => {
  const picaRunner = pica()
  // Create an abstract canvas and get context
  const canvas = makeCanvas(img)
  picaRunner.resize(img, canvas)
    .then(result => picaRunner.toBlob(result, 'image/png'))
    .then((blob) => {
      const reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onload = readerE => resolve(readerE.target.result)
      reader.onerror = reject
    })
})

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
