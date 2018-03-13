export const processTotal = (action, store) => {
  const lines = store.ui.lines.getAsArray()
  store.ui.total.set(lines.reduce(
    (acc, curr) => acc + (curr.nb * curr.pricePerUnit),
    0,
  ))
}

export const getPDF = (action, store, { http }) => {
  const body = {
    client: store.ui.client.get(),
    dates: store.ui.dates.get(),
    lines: store.ui.lines.getAsArray(),
    id: store.ui.id.get(),
    timetable: store.ui.timetable.getAsArray(),
  }

  http('PDF').post('/api/invoices', body, { credentials: 'include' })
}

export const setOk = async (action, store) => {
  store.ui.ok.set(true)
}

export const getLastId = (action, store, { http }) => {
  http('LAST_ID').get('/api/lastid', null, { credentials: 'include' })
}

export const setMaxId = ({ payload }, store) => {
  store.ui.id.set(`${payload + 1}`.padStart(5, '0'))
}

export const removeLastId = (action, store) => {
  store.ui.id.reset()
}
