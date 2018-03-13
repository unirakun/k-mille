import { initializeCurrentLocation } from 'redux-little-router'
import { createStore, keyValue, simpleObject } from 'k-ramel'
import drivers, { router } from './drivers'

export default () => {
  const store = createStore({
    router: router.getReducer(),
    data: {
      invoices: keyValue({ key: 'id' }),
      profile: simpleObject(),
    },
    ui: {
      ok: simpleObject({ defaultData: false }),
      id: simpleObject({ defaultData: '' }),
      lines: keyValue({ key: 'title' }),
      timetable: keyValue({ key: 'date' }),
      client: simpleObject(),
      dates: simpleObject(),
      total: simpleObject({ defaultData: 0 }),
    },
  }, {
    enhancer: router.getEnhancer(),
    drivers,
  })

  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }

  return store
}
