import { container } from 'ui-hocs'
import Component from './timetable'

const mapStore = (store, { id }) => ({
  ...store.ui.timetable.get(id),
})

export default container({ mapStore })(Component)
