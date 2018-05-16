import { container } from 'hoc'
import Component from './expense'

const mapStore = (store, { id }) => store.data.expenses.get(id)

export default container({ mapStore })(Component)
