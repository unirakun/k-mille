import { when } from 'k-ramel'
import * as auth from './auth'

export default [
  when('@@krml/INIT')(auth.init),
  when(/^@@http\/.*FAILED.*/, ({ status }) => status === 401)(auth.login),
]
