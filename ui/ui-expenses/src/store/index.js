import { initializeCurrentLocation } from 'redux-little-router'
import { createStore, keyValue, simpleObject } from 'k-ramel'
import drivers, { router } from './drivers'

export default () => {
  const store = createStore(
    {
      router: router.getReducer(),
      data: {
        profile: simpleObject(),
        fileId: simpleObject({ defaultData: '' }),
        prices: simpleObject({ defaultData: [] }),
        expenses: keyValue({ key: 'id' }),
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
      enhancer: router.getEnhancer(),
      drivers,
    },
  )

  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }

  return store
}
