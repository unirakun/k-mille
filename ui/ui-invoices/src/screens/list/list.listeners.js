import { when } from 'k-ramel'
import { load, set, map, remove, setPaid } from './list.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>list')(load),
  when('@@http/INVOICES>GET>ENDED')(set),
  when('@@krf/SET>DATA>INVOICES')(map),
  when('@@krf/REMOVE>DATA>INVOICES')(map),
  when('@@ui/ON_REMOVE_INVOICE')(remove),
  when('@@ui/ON_PAID_INVOICE')(setPaid),
]
