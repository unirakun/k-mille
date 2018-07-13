import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export const load = (action, store, { http }) => {
  http('INVOICES').get('/api/invoices')
}

export const set = ({ payload }, store) => {
  store.data.invoices.set(payload)
}

export const map = (action, store) => {
  // utils
  const formatCurrency = price => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
  const getTotalPriceTTC = pricesHT => formatCurrency(pricesHT.reduce((acc, price) => acc + (price.nb * price.pricePerUnit * 1.2), 0))
  const makeInvoice = invoice => ({
    id: invoice.id,
    fileId: invoice.fileId,
    clientName: invoice.client.name,
    since: distanceInWordsToNow(invoice.dates.print),
    priceTTC: getTotalPriceTTC(invoice.lines),
    timetable: invoice.timetable.map((line, i) => ({
      id: invoice.ranges[i],
      priceTTC: formatCurrency(line.price * 1.2),
      since: distanceInWordsToNow(line.date),
    })),
  })

  const invoices = store.data.invoices.getAsArray()
  store.ui.list.invoices.set(invoices.map(makeInvoice))
}

export const remove = async ({ payload }, store, { http }) => {
  const { id, ranges, fileId } = store.data.invoices.get(payload)

  await http('INVOICES').delete('/api/invoices', { id, ranges, fileId })

  store.data.invoices.remove(id)
}
