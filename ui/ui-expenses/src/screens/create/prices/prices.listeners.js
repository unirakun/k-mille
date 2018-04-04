import { when } from 'k-ramel'
import * as r from './prices.reactions'

export default [
  when('@@ui/PRICE_CHANGED')(r.setPrice),
  when('@@ui/ON_TOGGLE_INPUT')(r.toggleInput),
]
