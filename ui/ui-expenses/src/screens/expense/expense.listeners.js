import { when } from 'k-ramel'
import { init, add, cancel, goBack, setPrice, setTaxe, setContext, setNeedRefund, error } from './expense.reactions'

export default [
  when('@@krf/SET>DATA>PRICES')(init),
  when('@@ui/ON_ADD_PRICE')(add),
  when('@@ui/ON_CANCEL')(cancel),
  when('@@http/IMAGES>DELETE>ENDED')(goBack),
  when('@@http/EXPENSES>POST>ENDED')(goBack),
  when('@@http/EXPENSES>POST>FAILED')(error),
  when('@@ui/PRICE_CHANGED')(setPrice),
  when('@@ui/CONTEXT_CHANGED')(setContext),
  when('@@ui/NEED_REFUND_CHANGED')(setNeedRefund),
  when('@@ui/TAXE_CHANGED')(setTaxe),
]
