import { when } from 'k-ramel'
import { processTotal, getPDF, setOk, getLastId, removeLastId, setMaxId } from './invoice.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>create')(getLastId),

  // this one is to make sure to have fresh info when we come back
  when('@@krml/LISTENERS>REMOVING>create')(removeLastId),

  when(/@@krf\/.*>UI>LINES/)(processTotal),
  when('@@ui/GET_PDF')(getPDF),
  when('@@http/PDF>POST>ENDED')(setOk),
  when('@@http/LAST_ID>GET>ENDED')(setMaxId),
]
