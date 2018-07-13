import { container } from 'ui-hocs'
import Component from './invoice'

const mapStore = (store, { id }) => ({
  ...store.ui.list.invoices.get(id),
  onRemove: () => store.dispatch({ type: '@@ui/ON_REMOVE_INVOICE', payload: id }),
})

export default container({ mapStore })(Component)
