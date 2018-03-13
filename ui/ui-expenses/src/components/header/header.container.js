import { inject } from '@k-ramel/react'
import Component from './header'

export default inject(store => ({
  ...store.data.profile.get(),
  ...store.ui.header.get(),
}))(Component)
