import { container } from 'ui-hocs'
import Component from './total'

const mapStore = store => ({
  total: store.ui.total.get(),
})

export default container({ mapStore })(Component)
