import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'

const CURRENCY_FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const DATE_FORMATTER = new Intl.DateTimeFormat('fr-FR')

const Timetable = ({ date, price }) => (
  <tr>
    <td>{DATE_FORMATTER.format(date)}</td>
    <td>{CURRENCY_FORMATTER.format(price)}</td>
  </tr>
)

Timetable.propTypes = {
  date: PropTypes.number,
  price: PropTypes.number,
}

Timetable.defaultProps = {
  date: undefined,
  price: 0,
}

export default component()(Timetable)
