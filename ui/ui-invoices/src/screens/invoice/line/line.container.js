import { inject } from '@k-ramel/react'
import Component from './line'

export default inject((store, { id }) => ({
  ...store.ui.lines.get(id),
}))(Component)
