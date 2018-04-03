import { when } from 'k-ramel'
import * as r from './create.reactions'

export default [
  when('@@ui/ON_SEND')(r.send),
  when('@@http/ON_SEND')(r.response),
  when('@@ui/PRICE_CHANGED')(r.setPrice),
  when('@@ui/ON_TOGGLE_INPUT')(r.toggleInput),
]
