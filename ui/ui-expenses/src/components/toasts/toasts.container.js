import { container } from 'ui-hocs'
import Component from './toasts'

const mapStore = (store, ownProps, { notification }) => ({
  toasts: notification.getKeys(),
})

export default container({ mapStore })(Component)
