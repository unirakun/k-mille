import { container } from 'hoc'
import Component from './needRefund'

const mapStore = store => ({
  onChange: e => store.dispatch({ type: '@@ui/NEED_REFUND_CHANGED', payload: e.target.checked }),
})

export default container({ mapStore })(Component)
