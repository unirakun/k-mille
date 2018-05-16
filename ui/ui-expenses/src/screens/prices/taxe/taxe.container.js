import { container } from 'hoc'
import Component from './taxe'

const mapStore = store => ({
  onChange: e => store.dispatch({ type: '@@ui/TAXE_CHANGED', payload: e.target.id }),
})

export default container({ mapStore })(Component)
