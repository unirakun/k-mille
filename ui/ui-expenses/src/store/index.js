import { createStore, types } from 'k-ramel'
import listeners from './listeners'
import drivers from './drivers'

export default createStore(
  {
    data: {
      profile: types.object(),
      fileId: types.string(),
      prices: types.array(),
      expenses: types.keyValue(),
      emails: types.object(),
    },
    ui: {
      header: types.object({ defaultData: { title: 'envoi' } }),
      list: types.array(),
      price: types.number(),
      context: types.number(),
      needRefund: types.bool(),
      taxe: types.number(),
      response: types.string(),
    },
    devices: {}, // FIXME: bug krml
  },
  {
    listeners,
    drivers,
  },
)
