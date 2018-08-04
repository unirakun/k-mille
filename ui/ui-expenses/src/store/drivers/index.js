/* eslint-env browser */
import router from '@k-ramel/driver-redux-little-router'
import routes from './routes'
import pica from './pica'

export default {
  router: router(routes),
  window: { getDriver: () => window },
  pica,
}
