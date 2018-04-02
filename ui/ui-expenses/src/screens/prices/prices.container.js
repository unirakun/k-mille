import { compose } from 'recompose'
import forRoute from 'hoc-little-router'
import { inject } from '@k-ramel/react'
import Component from './prices'

// TODO: rename directory after screenName (create)
const screenName = 'create'

export default compose(
  forRoute.absolute(screenName),
  inject(store => ({
    prices: store.data.prices.get(),
    fileId: store.data.fileId.get(),
  })),
)(Component)
