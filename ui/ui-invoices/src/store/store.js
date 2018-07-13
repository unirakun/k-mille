import { createStore, types } from 'k-ramel'
import listeners from './listeners'
import drivers from './drivers'

export default createStore(
  {
    data: {
      invoices: types.keyValue(),
      profile: types.object(),
    },
    ui: {
      list: {
        invoices: types.keyValue(),
      },
      ok: types.object({ defaultData: false }),
      id: types.string(),
      lines: types.keyValue({ key: 'title' }),
      timetable: types.keyValue({ key: 'date' }),
      client: types.object(),
      dates: types.object(),
      total: types.number(),
    },
  },
  {
    listeners,
    drivers,
  },
)
