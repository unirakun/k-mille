import { createStore, keyValue, simpleObject } from 'k-ramel'
import listeners from './listeners'
import drivers from './drivers'

export default createStore(
  {
    data: {
      invoices: keyValue({ key: 'id' }),
      profile: simpleObject(),
    },
    ui: {
      list: {
        invoices: keyValue({ key: 'id' }),
      },
      ok: simpleObject({ defaultData: false }),
      id: simpleObject({ defaultData: '' }),
      lines: keyValue({ key: 'title' }),
      timetable: keyValue({ key: 'date' }),
      client: simpleObject(),
      dates: simpleObject(),
      total: simpleObject({ defaultData: 0 }),
    },
  },
  {
    listeners,
    drivers,
  },
)
