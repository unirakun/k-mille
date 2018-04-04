import React from 'react'
import PropTypes from 'prop-types'
import styles from './price.styles'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Price = ({ price, selectedPrice, onChange }) => (
  <label htmlFor={price} className={styles.price}>
    <input
      type="radio"
      id={price}
      name="price"
      className={styles.input}
      defaultChecked={price === selectedPrice}
      onChange={onChange}
    />
    <div>{FORMATTER.format(price)}</div>
  </label>
)

Price.propTypes = {
  price: PropTypes.number.isRequired,
  selectedPrice: PropTypes.number.isRequired,
  onChange: PropTypes.func,
}

Price.defaultProps = {
  onChange: undefined,
}

export default Price
