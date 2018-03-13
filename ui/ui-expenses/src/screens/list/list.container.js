import { compose } from 'recompose'
import { listen } from '@k-ramel/react'
import forRoute from 'hoc-little-router'
import Component from './list'
import listeners from './list.listeners'

const screenName = 'list'

export default compose(
  forRoute.absolute(screenName),
  listen(listeners, screenName),
)(Component)
