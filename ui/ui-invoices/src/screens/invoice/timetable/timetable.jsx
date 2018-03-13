import React from 'react'
import PropTypes from 'prop-types'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Timetable = ({ date, price, onRemove }) => (
  <tr>
    <td>{date}</td>
    <td>{FORMATTER.format(price)}</td>
  </tr>
)

Timetable.propTypes = {
  date: PropTypes.date,
  price: PropTypes.number,
  onRemove: PropTypes.func,
}

Timetable.defaultProps = {
  date: undefined,
  price: 0,
  onRemove: undefined,
}

export default Timetable
