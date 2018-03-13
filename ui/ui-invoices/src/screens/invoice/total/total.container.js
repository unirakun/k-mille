import { inject } from '@k-ramel/react'
import Component from './total'

export default inject(store => ({
  total: store.ui.total.get(),
}))(Component)
