/* eslint-env browser */
import router from './router'
import image from './image'

export default {
  router,
  window: { getDriver: () => window },
  image,
}
