import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './price.styles'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Price = ({
  classes,
  price,
  selected,
  onChange,
}) => (
  <label htmlFor={price} className={classes.price}>
    <input type="radio" id={price} name="price" className={classes.input} defaultChecked={selected} onChange={onChange} />
    <div>{FORMATTER.format(price)}</div>
  </label>
)

Price.propTypes = {
  classes: PropTypes.object,
  price: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Price.defaultProps = {
  classes: {},
  selected: false,
  onChange: undefined,
}

export default component({ styles })(Price)
