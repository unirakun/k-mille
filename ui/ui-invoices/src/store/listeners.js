import { when } from 'k-ramel'
import { auth } from './reactions'

export default [
  when('@@krml/INIT')(auth.init),
  when(/@@http\/.*>FAILED/, ({ status }) => status === 401)(auth.login),
]
