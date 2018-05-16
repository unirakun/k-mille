import { container } from 'ui-hocs'
import Component from './expenses'

const mapStore = store => ({
  expenses: store.ui.list.get(),
})

export default container({ mapStore })(Component)
