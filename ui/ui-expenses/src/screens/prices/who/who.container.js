import { inject } from '@k-ramel/react'
import Component from './who'

export default inject(store => ({
  onChange: e => store.dispatch({ type: '@@ui/WHO_CHANGED', payload: e.target.id }),
}))(Component)
