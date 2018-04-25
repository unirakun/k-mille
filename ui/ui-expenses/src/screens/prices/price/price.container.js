import { inject } from '@k-ramel/react'
import Component from './price'

export default inject(store => ({
  onChange: e => store.dispatch({ type: '@@ui/PRICE_CHANGED', payload: e.target.id }),
}))(Component)
