import { compose } from 'recompose'
import { inject, listen } from '@k-ramel/react'
import Component from './main'
import listeners from './main.listeners'

export default compose(
  listen(listeners),
  inject(store => ({
    prices: store.data.prices.get(),
    fileId: store.data.fileId.get(),
    ...store.ui.header.get(),
  })),
)(Component)
