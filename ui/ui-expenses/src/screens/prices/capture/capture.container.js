import { inject } from '@k-ramel/react'
import Component from './capture'

export default inject(store => ({
  onChange: e => store.dispatch({ type: '@@ui/CAPTURE', payload: e.target.checked }),
}))(Component)
