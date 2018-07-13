import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export const load = (action, store, { http }) => {
  http('INVOICES').get('/api/invoices')
}

export const set = ({ payload }, store) => {
  store.data.invoices.set(payload)
}

export const map = (action, store) => {
  const formatCurrency = price => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
  const getTotalPriceTTC = pricesHT => formatCurrency(pricesHT.reduce((acc, price) => acc + (price.nb * price.pricePerUnit * 1.2), 0))
  const invoices = store.data.invoices.getAsArray()

  store.ui.list.invoices.set(invoices.map(invoice => ({
    id: invoice.id,
    since: invoice.dates.print && distanceInWordsToNow(invoice.dates.print),
    fileId: invoice.fileId,
    clientName: invoice.client.name,
    priceTTC: getTotalPriceTTC(invoice.lines),
  })))
}

export const remove = async ({ payload }, store, { http }) => {
  const { id, ranges, fileId } = store.data.invoices.get(payload)

  await http('INVOICES').delete('/api/invoices', { id, ranges, fileId })

  store.data.invoices.remove(id)
}
