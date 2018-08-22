import { container } from 'ui-hocs'
import Component from './toast'

const mapStore = (store, { id }, { notification }) => ({
  ...notification.get(id),
  onClick: () => { notification.close(id) },
})

export default container({ mapStore })(Component)
