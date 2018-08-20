import { container } from 'ui-hocs'
import listeners from './expense.listeners'
import Component from './expense'

const screenName = 'expense'

const mapStore = store => ({
  prices: store.data.prices.get(),
  response: store.ui.response.get(),
  add: () => store.dispatch({ type: '@@ui/ON_ADD_PRICE' }),
  cancel: () => store.dispatch({ type: '@@ui/ON_CANCEL' }),
})

export default container({ screenName, listeners, mapStore })(Component)
