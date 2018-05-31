import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './taxe.styles'

const numberFormat = new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 })

const Taxe = ({
  classes,
  taxe,
  selected,
  onChange,
}) => (
  <label htmlFor={taxe} className={classes.taxe}>
    <input type="radio" id={taxe} name="taxe" className={classes.input} defaultChecked={selected} onChange={onChange} />
    <div>{typeof taxe !== 'number' ? taxe : numberFormat.format(taxe) }</div>
  </label>
)

Taxe.propTypes = {
  classes: PropTypes.object,
  taxe: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Taxe.defaultProps = {
  classes: {},
  selected: false,
  onChange: undefined,
}

export default component({ styles })(Taxe)
