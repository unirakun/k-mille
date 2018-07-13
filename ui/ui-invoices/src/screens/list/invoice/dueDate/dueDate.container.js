import { container } from 'ui-hocs'
import Component from './dueDate'

const mapStore = (store, { invoiceId, id }) => ({
  ...store.ui.list.timetables.get(id),
  onPaid: () => store.dispatch({ type: '@@ui/ON_PAID_INVOICE', payload: { invoiceId, dueDateId: id } }),
})

export default container({ mapStore })(Component)
