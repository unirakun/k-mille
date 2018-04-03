import { compose } from 'recompose'
import forRoute from 'hoc-little-router'
import { inject, listen } from '@k-ramel/react'
import listeners from './prices.listeners'
import Component from './prices'

// TODO: rename directory after screenName (create)
const screenName = 'create'

export default compose(
  forRoute.absolute(screenName),
  listen(listeners),
  inject(store => ({
    prices: store.data.prices.get(),
    showInput: store.ui.prices.showInput.get(),
    toggleInput: () => store.dispatch('@@ui/ON_TOGGLE_INPUT'),
    onChange: e => store.dispatch({ type: '@@ui/PRICE_CHANGED', payload: e.target.value }),
  })),
)(Component)
