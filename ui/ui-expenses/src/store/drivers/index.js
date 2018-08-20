/* eslint-env browser */
import router from './router'
import image from './image'
import notification from './notification'

export default {
  router,
  window: { getDriver: () => window },
  image,
  notification,
}
