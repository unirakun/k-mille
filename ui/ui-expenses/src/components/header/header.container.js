import { container } from 'ui-hocs'
import Component from './header'

const mapStore = store => ({
  ...store.data.profile.get(),
  ...store.ui.header.get(),
})

export default container({ mapStore })(Component)
