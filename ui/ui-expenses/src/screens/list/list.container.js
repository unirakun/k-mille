import { compose } from 'recompose'
import { listen } from '@k-ramel/react'
import Component from './list'
import listeners from './list.listeners'

const screenName = 'list'

export default compose(
  listen(listeners, screenName),
)(Component)
