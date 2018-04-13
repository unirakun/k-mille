import React from 'react'
import PropTypes from 'prop-types'
import Price from './price'
import styles from './prices.styles'

const Prices = ({ prices, response, add }) => {
  const defaultSelected = prices[0]
  return (
    <div className={styles.prices}>
      <h2>Prix</h2>
      <div className={styles.pricesList}>
        {prices.map(price => (
          <Price key={price} price={price} selected={price === defaultSelected} />
        ))}
      </div>
      <button onClick={add}>👍</button>
      <div>{response}</div>
    </div>
  )
}

Prices.propTypes = {
  prices: PropTypes.array,
  response: PropTypes.string,
  add: PropTypes.func,
}

Prices.defaultProps = {
  prices: [],
  response: '',
  add: undefined,
}

export default Prices
