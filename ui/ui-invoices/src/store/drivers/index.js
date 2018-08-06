/* eslint-env browser */
import router from './router'

export default {
  router,
  window: { getDriver: () => window },
}
