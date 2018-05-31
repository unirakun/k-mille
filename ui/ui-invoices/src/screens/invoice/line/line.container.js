import { container } from 'ui-hocs'
import Component from './line'

const mapStore = (store, { id }) => ({
  ...store.ui.lines.get(id),
})

export default container({ mapStore })(Component)
