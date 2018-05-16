import { inject } from '@k-ramel/react'
import Component from './context'

export default inject(store => ({
  onChange: e => store.dispatch({
    type: '@@ui/CONTEXT_CHANGED',
    payload: (e.target.type === 'text' ? e.target.value : e.target.id),
  }),
}))(Component)
