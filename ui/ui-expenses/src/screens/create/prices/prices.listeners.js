import { when } from 'k-ramel'
import { setPrice, toggleInput } from './prices.reactions'

export default [
  when('@@ui/PRICE_CHANGED')(setPrice),
  when('@@ui/ON_TOGGLE_INPUT')(toggleInput),
]
