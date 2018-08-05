/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import pica from 'pica/dist/pica'

export const addListener = (action, store, { window }) => {
  window.addEventListener('paste', pasteEvent => store.dispatch({ type: '@@ui/ON_PASTE', payload: pasteEvent }))
}

export const removeListener = (action, store, { window }) => {
  window.removeEventListener('paste')
}

export const load = (action, store, { http }) => {
  http('EXPENSES').get('/api/expenses')
}

export const submitClipboardImage = async ({ payload }, store) => {
  if (!payload || !payload.clipboardData || !payload.clipboardData.items) return

  const { items } = payload.clipboardData
  for (let i = 0; i < items.length; i++) { // items it's not an array
    const item = items[i]
    // Skip content if not an image
    if (/image.*/.test(item.type)) {
      // dispatch submit event with raw image pasted
      store.dispatch({ type: '@@ui/ON_SUBMIT', payload: item.getAsFile() })
    }
  }
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

export const submit = ({ payload }, store, { window, http }) => {
  // add image to a <img in DOM (the source of the transformation)
  const reader = new window.FileReader()
  reader.onload = (e) => {
    const img = window.document.getElementById('source')
    img.src = e.target.result

    window.requestAnimationFrame(() => {
      img.width = img.clientWidth
      img.height = img.clientHeight

      let targetWidth = img.width * 0.30
      if (targetWidth < 1000) targetWidth = 1000
      const targetHeight = (img.height / img.width) * targetWidth

      const canvas = window.document.getElementById('resize')
      canvas.width = targetWidth
      canvas.height = targetHeight

      const picaRunner = pica()
      picaRunner.resize(img, canvas)
        .then(result => picaRunner.toBlob(result, 'image/jpeg', 0.50))
        .then((blob) => {
          const reader2 = new window.FileReader()
          reader2.onerror = (readerE) => { store.dispatch({ type: '@@file/ON_ERROR', payload: readerE }) }
          reader2.onload = async (readerE) => {
            http('IMAGES').post('/api/images', {
              image: readerE.target.result.replace(/data:.*;base64,/, ''),
              user: store.data.profile.get().name,
            })
          }
          reader2.readAsDataURL(blob)
        })
    })
  }
  reader.readAsDataURL(payload)
}

export const sendEmails = (action, store, { http }) => {
  http('EMAILS').post('/api/emails')
}

export const setEmails = ({ payload }, store) => {
  store.data.emails.set(payload)
}
