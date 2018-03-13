import { compose } from 'recompose'
import forRoute from 'hoc-little-router'
import { listen, inject } from '@k-ramel/react'
import listeners from './list.listeners'
import Component from './list'

const screenName = 'list'

export default compose(
  forRoute.absolute(screenName),
  listen(listeners, screenName),
  inject(store => ({
    invoices: store.data.invoices.getAsArray(),
    onRemove: (id) => store.dispatch({ type: '@@ui/ON_REMOVE', payload: id }),
  })),
)(Component)
