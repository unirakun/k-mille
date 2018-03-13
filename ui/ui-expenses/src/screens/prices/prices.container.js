import { inject } from '@k-ramel/react'
import Component from './prices'

export default inject(store => ({
  prices: store.data.prices.get(),
}))(Component)
