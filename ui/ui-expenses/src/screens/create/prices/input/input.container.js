import { compose } from 'recompose'
import { inject } from '@k-ramel/react'
import Component from './input'

export default compose(inject(store => ({
  prices: store.data.prices.get(),
  showInput: store.ui.create.showInput.get(),
  toggleInput: () => store.dispatch('@@ui/ON_TOGGLE_INPUT'),
  onChange: e => store.dispatch({ type: '@@ui/PRICE_CHANGED', payload: e.target.value }),
})))(Component)
