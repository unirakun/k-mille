import { inject } from '@k-ramel/react'
import Component from './timetable'

export default inject((store, { id }) => ({
  ...store.ui.timetable.get(id),
}))(Component)
