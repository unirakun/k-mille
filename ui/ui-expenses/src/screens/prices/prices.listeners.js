import { when } from 'k-ramel'
import { init, add, response, setPrice, setTaxe, setContext, error } from './prices.reactions'

export default [
  when('@@krf/SET>DATA>PRICES')(init),
  when('@@ui/ON_ADD_PRICE')(add),
  when('@@http/EXPENSES>POST>ENDED')(response),
  when('@@http/EXPENSES>POST>FAILED')(error),
  when('@@ui/PRICE_CHANGED')(setPrice),
  when('@@ui/CONTEXT_CHANGED')(setContext),
  when('@@ui/TAXE_CHANGED')(setTaxe),
]
