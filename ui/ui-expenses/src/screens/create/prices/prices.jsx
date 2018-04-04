import React from 'react'
import PropTypes from 'prop-types'
import Price from './price'
import styles from './prices.styles'

const Prices = ({
  prices,
  showInput,
  toggleInput,
  onChange,
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

    {(showInput || !prices.length) && (
      <div className={styles.priceInput}>
        <input type="number" className="input" autoFocus onChange={onChange} />
        {!!prices.length && <button onClick={toggleInput}>ANNULER</button>}
      </div>
    )}
  </div>
)

Prices.propTypes = {
  prices: PropTypes.array,
  toggleInput: PropTypes.func,
  showInput: PropTypes.bool,
  onChange: PropTypes.func,
}

Prices.defaultProps = {
  prices: [],
  showInput: false,
  toggleInput: undefined,
  onChange: undefined,
}

export default Prices
