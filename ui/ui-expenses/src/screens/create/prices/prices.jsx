import React from 'react'
import PropTypes from 'prop-types'
import Price from './price'
import Input from './input'
import styles from './prices.styles'

const Prices = ({
  prices,
  showInput,
  toggleInput,
}) => (
  <div className={styles.container}>
    <h2>Prix</h2>
    {!!prices.length && !showInput && (
      <div className={styles.prices}>
        <div className="list">
          {prices.map(price => <Price key={price} price={price} />)}
        </div>
        <button onClick={toggleInput}>+</button>
      </div>
    )}

    {(showInput || !prices.length) && <Input /> }
  </div>
)

Prices.propTypes = {
  prices: PropTypes.array,
  toggleInput: PropTypes.func,
  showInput: PropTypes.bool,
}

Prices.defaultProps = {
  prices: [],
  showInput: false,
  toggleInput: undefined,
}

export default Prices
