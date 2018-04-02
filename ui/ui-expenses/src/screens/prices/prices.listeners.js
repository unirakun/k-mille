import { when } from 'k-ramel'
import * as r from './prices.reactions'

export default [
  when('@@ui/ON_SEND')(r.send),
  when('@@http/ON_SEND')(r.response),
  when('@@ui/PRICE_CHANGED')(r.setPrice),
]
