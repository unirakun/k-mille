import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'hoc'
import styles from './taxe.styles'

const numberFormat = new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 })

const Taxe = ({ taxe, selected, onChange }) => (
  <label htmlFor={taxe} className={styles.taxe}>
    <input type="radio" id={taxe} name="taxe" className={styles.input} defaultChecked={selected} onChange={onChange} />
    <div>{typeof taxe !== 'number' ? taxe : numberFormat.format(taxe) }</div>
  </label>
)

Taxe.propTypes = {
  taxe: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Taxe.defaultProps = {
  selected: false,
  onChange: undefined,
}

export default component()(Taxe)
