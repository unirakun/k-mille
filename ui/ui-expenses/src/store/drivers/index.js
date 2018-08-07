/* eslint-env browser */
import router from './router'
import pica from './pica'

export default {
  router,
  window: { getDriver: () => window },
  pica,
}
