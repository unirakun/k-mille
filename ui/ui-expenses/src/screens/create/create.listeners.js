import { when } from 'k-ramel'
import * as r from './create.reactions'

export default [
  when('@@ui/ON_SEND')(r.send),
  when('@@http/ON_SEND')(r.response),
]
