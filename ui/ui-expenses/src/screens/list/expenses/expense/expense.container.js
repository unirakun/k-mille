import { container } from 'ui-hocs'
import Component from './expense'

const mapStore = (store, { id }) => store.data.expenses.get(id)

export default container({ mapStore })(Component)
