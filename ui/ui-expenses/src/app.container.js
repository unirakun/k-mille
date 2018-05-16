import { compose } from 'recompose'
import { provider, listen } from '@k-ramel/react'
import App from './app'
import store from './store'
import listeners from './app.listeners'

export default compose(
  provider(store),
  listen(listeners, 'app'),
)(App)
