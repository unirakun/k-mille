import { container } from 'ui-hocs'
import Component from './send'

const mapStore = store => ({
  sendFiles: () => store.dispatch('@@ui/ON_SEND'),
})

export default container({ mapStore })(Component)
