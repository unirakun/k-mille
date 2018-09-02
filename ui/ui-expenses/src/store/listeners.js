import { when } from 'k-ramel'
import { auth, notifications } from './reactions'

export default [
  when('@@krml/INIT')(auth.init),
  when(/@@http\/.*>FAILED/, ({ status }) => status === 401)(auth.login),
  when(/@@http.*FAILED.*/)(notifications.error),
  when('@@krml/EXCEPTION')(notifications.error),
]
