import { inject } from '@k-ramel/react'
import Component from './send'

export default inject(store => ({
  sendFiles: () => store.dispatch('@@ui/ON_SEND'),
}))(Component)
