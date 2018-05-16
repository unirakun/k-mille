import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './price.styles'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Price = ({ price, selected, onChange }) => (
  <label htmlFor={price} className={styles.price}>
    <input type="radio" id={price} name="price" className={styles.input} defaultChecked={selected} onChange={onChange} />
    <div>{FORMATTER.format(price)}</div>
  </label>
)

Price.propTypes = {
  price: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Price.defaultProps = {
  selected: false,
  onChange: undefined,
}

export default component()(Price)
