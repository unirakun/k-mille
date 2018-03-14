import { inject } from '@k-ramel/react'
import Component from './expenses'

export default inject(store => ({
  expenses: store.ui.list.get(),
}))(Component)
