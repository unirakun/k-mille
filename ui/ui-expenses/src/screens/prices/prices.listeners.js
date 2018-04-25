import { when } from 'k-ramel'
import { add, response, setPrice, setTaxe, error } from './prices.reactions'

export default [
  when('@@ui/ON_ADD_PRICE')(add),
  when('@@http/EXPENSES>POST>ENDED')(response),
  when('@@http/EXPENSES>POST>FAILED')(error),
  when('@@ui/PRICE_CHANGED')(setPrice),
  when('@@ui/TAXE_CHANGED')(setTaxe),
]
