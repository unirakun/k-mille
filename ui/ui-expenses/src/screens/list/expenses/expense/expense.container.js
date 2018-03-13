import { inject } from '@k-ramel/react'
import Component from './expense'

export default inject((store, { id }) => store.data.expenses.get(id))(Component)
