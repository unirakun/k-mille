import { container } from 'ui-hocs'
import Component from './emails'

const loader = true

const mapStore = store => ({
  loaded: store.data.emails.isInitialized(),
  emails: store.data.emails.get(),
})

export default container({ loader, mapStore })(Component)
