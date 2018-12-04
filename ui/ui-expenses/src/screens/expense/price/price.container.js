import { container } from 'ui-hocs'
import Component from './price'

const mapStore = store => ({
  onChange: e => store.dispatch({
    type: '@@ui/PRICE_CHANGED',
    payload: (e.target.type === 'text' ? e.target.value : e.target.id),
  }),
})

export default container({ mapStore })(Component)
