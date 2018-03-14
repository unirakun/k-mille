import React from 'react'
import PropTypes from 'prop-types'
import styles from './price.styles'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Price = ({ price, selected }) => (
  <label htmlFor={price} className={styles.price}>
    <input type="radio" id={price} name="price" className={styles.input} defaultChecked={selected} />
    <div>{FORMATTER.format(price)}</div>
  </label>
)

Price.propTypes = {
  price: PropTypes.number.isRequired,
  selected: PropTypes.bool,
}

Price.defaultProps = {
  selected: false,
}

export default Price
