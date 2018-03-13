export const load = (action, store, { http }) => {
  http('INVOICES').get('/api/invoices', null, { credentials: 'include' })
}

export const set = ({ payload }, store) => {
  store.data.invoices.set(payload)
}

export const remove = async ({ payload }, store, { http }) => {
  const { id, ranges, fileId } = store.data.invoices.get(payload)

  await http('INVOICES').delete('/api/invoices', { id, ranges, fileId }, { credentials: 'include' })

  store.data.invoices.remove(id)
}
