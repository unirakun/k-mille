import { createStore, simpleObject } from 'k-ramel'
import listeners from './listeners'

export default createStore(
  {
    data: {
      profile: simpleObject(),
      fileId: simpleObject({ defaultData: '' }),
      prices: simpleObject({ defaultData: [] }),
    },
    ui: {
      header: simpleObject({ defaultData: { title: 'envoi' } }),
    },
  },
  {
    listeners,
    drivers: {
      window: () => window,
    },
  },
)
