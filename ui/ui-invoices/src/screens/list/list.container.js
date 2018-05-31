import { container } from 'ui-hocs'
import listeners from './list.listeners'
import Component from './list'

const screenName = 'list'

const mapStore = store => ({
  invoices: store.data.invoices.getAsArray(),
  onRemove: id => store.dispatch({ type: '@@ui/ON_REMOVE', payload: id }),
})

export default container({ screenName, mapStore, listeners })(Component)
