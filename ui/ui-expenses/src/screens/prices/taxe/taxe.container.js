import { inject } from '@k-ramel/react'
import Component from './taxe'

export default inject(store => ({
  onChange: e => store.dispatch({ type: '@@ui/TAXE_CHANGED', payload: e.target.id }),
}))(Component)
