import { container } from 'hoc'
import listeners from './list.listeners'
import Component from './list'

const screenName = 'list'

export default container({ screenName, listeners })(Component)
