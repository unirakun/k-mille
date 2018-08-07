import { when } from 'k-ramel'
import {
  load,
  addListener,
  removeListener,
  setExpenses,
  goToCreate,
  setPrices,
  pasteImage,
  reduceImage,
  postImage,
  sendEmails,
  setEmails,
} from './list.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>list')(load),
  when('@@krml/LISTENERS>ADDED>list')(addListener),
  when('@@krml/LISTENERS>REMOVING>list')(removeListener),
  when('@@http/EXPENSES>GET>ENDED')(setExpenses),

  // new expense
  when('@@http/IMAGES>POST>ENDED')(goToCreate),
  when('@@http/IMAGES>POST>ENDED')(setPrices),
  when('@@ui/ON_PASTE')(pasteImage),
  when('@@ui/ON_SUBMIT')(reduceImage),
  when('@@image/IMAGE_REDUCED')(postImage),

  // emails
  when('@@ui/ON_SEND')(sendEmails),
  when('@@http/EMAILS>POST>ENDED')(setEmails),
  when('@@http/EMAILS>POST>ENDED')(load),
]
