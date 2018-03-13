import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Total = ({ total }) => (
  <Fragment>
    <tr>
      <td></td>
      <td></td>
      <td>Total HT</td>
      <td>{FORMATTER.format(total)}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>TVA</td>
      <td>20%</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Total TTC</td>
      <td>{FORMATTER.format(total * 1.2)}</td>
    </tr>
  </Fragment>
)

Total.propTypes = {
  title: PropTypes.string,
  nb: PropTypes.number,
  pricePerUnit: PropTypes.number,
  onRemove: PropTypes.func,
}

Total.defaultProps = {
  title: undefined,
  nb: 0,
  pricePerUnit: undefined,
  onRemove: undefined,
}

export default Total
