import { createStore } from 'k-ramel'
import definition from './definition'
import listeners from './listeners'
import drivers from './drivers'

export default createStore(
  definition,
  {
    listeners,
    drivers,
  },
)
