import { inject } from '@k-ramel/react'
import Component from './needRefund'

export default inject(store => ({
  onChange: e => store.dispatch({ type: '@@ui/NEED_REFUND_CHANGED', payload: e.target.checked }),
}))(Component)
