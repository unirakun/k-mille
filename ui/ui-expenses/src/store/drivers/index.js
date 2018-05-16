/* eslint-env browser */
import router from '@k-ramel/driver-redux-little-router'
import routes from './routes'
import camera from './camera'

export default {
  router: router(routes),
  window: { getDriver: () => window },
  camera,
}
