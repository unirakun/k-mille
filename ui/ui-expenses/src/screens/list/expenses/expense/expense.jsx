import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './expense.styles'

const FORMATTER_EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const FORMATTER_DATE = new Intl.DateTimeFormat('fr-FR', { month: 'short', day: 'numeric' })

const Expense = ({
  date,
  context,
  price,
  user,
  needRefund,
  fileId,
}) => (
  <tr>
    <td>{date && FORMATTER_DATE.format(date)}</td>
    <td>{context}</td>
    <td className={styles.price}>{FORMATTER_EUR.format(price)}</td>
    <td>{needRefund && user}</td>
    <td className={styles.file}>
      <a href={`https://drive.google.com/file/d/${fileId}/view`}>file</a>
    </td>
  </tr>
)

Expense.propTypes = {
  date: PropTypes.number,
  context: PropTypes.string,
  price: PropTypes.number,
  user: PropTypes.string,
  needRefund: PropTypes.bool,
  fileId: PropTypes.string,
}

Expense.defaultProps = {
  date: undefined,
  context: undefined,
  price: undefined,
  user: undefined,
  needRefund: undefined,
  fileId: undefined,
}

export default component()(Expense)
