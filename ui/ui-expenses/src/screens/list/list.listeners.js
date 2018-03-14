import { when } from 'k-ramel'
import { load, setExpenses, goToCreate, setPrices, submit } from './list.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>list')(load),
  when('@@http/EXPENSES>GET>ENDED')(setExpenses),

  // new expense
  when('@@http/IMAGES>POST>ENDED')(goToCreate),
  when('@@http/IMAGES>POST>ENDED')(setPrices),
  when('@@ui/ON_SUBMIT')(submit),
  when('@@ui/ON_SEND')(() => {
    console.log('send files')
  }),
]
