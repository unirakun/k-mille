import { when } from 'k-ramel'
import { send, respond } from './create.reactions'

export default [
  when('@@ui/ON_SEND')(send),
  when('@@http/ON_SEND')(respond),
]
