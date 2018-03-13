import { compose } from 'recompose'
import { provider, listen } from '@k-ramel/react'
import App from './app'
import createStore from './store'
import listeners from './app.listeners'

const store = createStore()

const name = 'app'

export default compose(
  provider(store),
  listen(listeners, name)
)(App)
