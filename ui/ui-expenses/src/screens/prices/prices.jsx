import React from 'react'
import PropTypes from 'prop-types'
import Price from './price'
import styles from './prices.styles'

const Prices = ({ prices }) => {
  const defaultSelected = prices[0]
  return (
    <div className={styles.prices}>
      <h2>Prix</h2>
      <div className={styles.pricesList}>
        {prices.map(price => (
          <Price key={price} price={price} selected={price === defaultSelected} />
        ))}
      </div>
    </div>
  )
}

Prices.propTypes = {
  prices: PropTypes.array,
}

Prices.defaultProps = {
  prices: [],
}

export default Prices
