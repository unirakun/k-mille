export const load = (action, store, { http }) => {
  http('EXPENSES').get('/api/expenses')
}

export const postImage = async ({ payload }, store, { http, pica }) => {
  // compress and resize by 2 the image
  const imageReduced = await pica.reduce(payload, 2)
  http('IMAGES').post('/api/images', {
    image: imageReduced,
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
