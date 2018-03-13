import React from 'react'
import PropTypes from 'prop-types'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Line = ({ title, nb, pricePerUnit }) => (
  <tr>
    <td>{title}</td>
    <td>{nb}</td>
    <td>{FORMATTER.format(pricePerUnit)}</td>
    <td>{FORMATTER.format(pricePerUnit * nb)}</td>
  </tr>
)

Line.propTypes = {
  title: PropTypes.string,
  nb: PropTypes.number,
  pricePerUnit: PropTypes.number,
}

Line.defaultProps = {
  title: undefined,
  nb: 0,
  pricePerUnit: undefined,
}

export default Line
