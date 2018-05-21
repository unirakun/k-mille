import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Total = ({ total }) => (
  <Fragment>
    <tr>
      <td />
      <td />
      <td>Total HT</td>
      <td>{FORMATTER.format(total)}</td>
    </tr>
    <tr>
      <td />
      <td />
      <td>TVA</td>
      <td>20%</td>
    </tr>
    <tr>
      <td />
      <td />
      <td>Total TTC</td>
      <td>{FORMATTER.format(total * 1.2)}</td>
    </tr>
  </Fragment>
)

Total.propTypes = {
  total: PropTypes.number,
}

Total.defaultProps = {
  total: 0,
}

export default component()(Total)
