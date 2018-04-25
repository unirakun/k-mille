import { inject } from '@k-ramel/react'
import Component from './forWhom'

export default inject(store => ({
  onChange: e => store.dispatch({ type: '@@ui/FORWHOM_CHANGED', payload: e.target.id }),
}))(Component)
