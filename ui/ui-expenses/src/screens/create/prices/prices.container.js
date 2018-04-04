import { compose } from 'recompose'
import { inject, listen } from '@k-ramel/react'
import listeners from './prices.listeners'
import Component from './prices'

export default compose(
  listen(listeners),
  inject(store => ({
    prices: store.data.prices.get(),
    showInput: store.ui.create.showInput.get(),
    toggleInput: () => store.dispatch('@@ui/ON_TOGGLE_INPUT'),
    onChange: e => store.dispatch({ type: '@@ui/PRICE_CHANGED', payload: e.target.value }),
  })),
)(Component)
