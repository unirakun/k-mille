import React from 'react'
import PropTypes from 'prop-types'
import styles from './taxe.styles'

const Taxe = ({ taxe, selected, onChange }) => (
  <label htmlFor={taxe} className={styles.taxe}>
    <input type="radio" id={taxe} name="taxe" className={styles.input} defaultChecked={selected} onChange={onChange} />
    <div>{`${taxe * 100}%`}</div>
  </label>
)

Taxe.propTypes = {
  taxe: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Taxe.defaultProps = {
  selected: false,
  onChange: undefined,
}

export default Taxe
