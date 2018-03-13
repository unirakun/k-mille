import { when } from 'k-ramel'
import { init, login } from './app.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>app')(init),

  when(/@@http\/.*>FAILED/, ({ status }) => status === 401)(login),
]
