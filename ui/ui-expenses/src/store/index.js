import { createStore, keyValue, simpleObject } from 'k-ramel'
import listeners from './listeners'
import drivers from './drivers'

export default createStore(
  {
    data: {
      profile: simpleObject(),
      fileId: simpleObject({ defaultData: '' }),
      prices: simpleObject({ defaultData: [] }),
      expenses: keyValue({ key: 'id' }),
      emails: simpleObject(),
    },
    ui: {
      header: simpleObject({ defaultData: { title: 'envoi' } }),
      list: simpleObject({ defaultData: [] }),
      price: simpleObject({ defaultData: 0 }),
      context: simpleObject({ defaultData: 0 }),
      needRefund: simpleObject({ defaultData: false }),
      taxe: simpleObject({ defaultData: 0 }),
      response: simpleObject({ defaultData: '' }),
    },
  },
  {
    listeners,
    drivers,
  },
)
