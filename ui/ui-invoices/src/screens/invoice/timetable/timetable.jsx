import React from 'react'
import PropTypes from 'prop-types'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Timetable = ({ date, price }) => (
  <tr>
    <td>{date}</td>
    <td>{FORMATTER.format(price)}</td>
  </tr>
)

Timetable.propTypes = {
  date: PropTypes.instanceOf(Date),
  price: PropTypes.number,
}

Timetable.defaultProps = {
  date: undefined,
  price: 0,
}

export default Timetable
