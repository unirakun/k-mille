// ref to paste function, it's used to remove listener.
let pasteEvent

export const addListener = (action, store, { window }) => {
  pasteEvent = e => store.dispatch({ type: '@@ui/ON_PASTE', payload: e })
  window.addEventListener('paste', pasteEvent)
}

export const removeListener = (action, store, { window }) => {
  window.removeEventListener('paste', pasteEvent)
}

export const pasteImage = ({ payload }, store) => {
  if (!payload || !payload.clipboardData || !payload.clipboardData.items) return

  const { items } = payload.clipboardData
  for (let i = 0; i < items.length; i += 1) { // items is a DataTransferItemList : https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList
    const item = items[i]
    // Skip content if not an image
    if (/image.*/.test(item.type)) {
      // dispatch submit event with raw image pasted
      store.dispatch({ type: '@@ui/ON_SUBMIT', payload: item.getAsFile() })
    }
  }
}

export const load = (action, store, { http }) => {
  http('EXPENSES').get('/api/expenses')
}

export const reduceImage = ({ payload }, store, { image }) => {
  image.reduce(payload)
}

export const postImage = ({ payload }, store, { http }) => {
  http('IMAGES').post('/api/images', {
    image: payload,
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
  router.push('create')
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
