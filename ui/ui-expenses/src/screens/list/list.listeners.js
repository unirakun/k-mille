import { when } from 'k-ramel'
import {
  load,
  setExpenses,
  goToCreate,
  setPrices,
  submit,
  sendEmails,
  setEmails,
} from './list.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>list')(load),
  when('@@http/EXPENSES>GET>ENDED')(setExpenses),

  // new expense
  when('@@http/IMAGES>POST>ENDED')(goToCreate),
  when('@@http/IMAGES>POST>ENDED')(setPrices),
  when('@@ui/ON_SUBMIT')(submit),

  // emails
  when('@@ui/ON_SEND')(sendEmails),
  when('@@http/EMAILS>POST>ENDED')(setEmails),
  when('@@http/EMAILS>POST>ENDED')(load),
]
