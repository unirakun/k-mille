import { compose } from 'recompose'
import forRoute from 'hoc-little-router'
import { listen } from '@k-ramel/react'
import listeners from './create.listeners'
import Component from './create'

const screenName = 'create'

export default compose(
  forRoute.absolute(screenName),
  listen(listeners),
)(Component)
