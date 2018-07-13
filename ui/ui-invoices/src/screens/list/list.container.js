import { container } from 'ui-hocs'
import listeners from './list.listeners'
import Component from './list'

const screenName = 'list'

const mapStore = store => ({
  invoices: store.ui.list.invoices.getKeys(),
})

export default container({ screenName, mapStore, listeners })(Component)
