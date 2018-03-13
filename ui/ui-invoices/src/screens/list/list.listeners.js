import { when } from 'k-ramel'
import { load, set, remove } from './list.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>list')(load),
  when('@@http/INVOICES>GET>ENDED')(set),

  when('@@ui/ON_REMOVE')(remove),
]
