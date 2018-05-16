import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'hoc'
import styles from './expense.styles'

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const Expense = ({
  context,
  price,
  user,
  needRefund,
  fileId,
}) => (
  <tr>
    <td>{context}</td>
    <td className={styles.price}>{FORMATTER.format(price)}</td>
    <td>{needRefund && user}</td>
    <td className={styles.file}>
      <a href={`https://drive.google.com/file/d/${fileId}/view`}>file</a>
    </td>
  </tr>
)

Expense.propTypes = {
  context: PropTypes.string,
  price: PropTypes.number,
  user: PropTypes.string,
  needRefund: PropTypes.bool,
  fileId: PropTypes.string,
}

Expense.defaultProps = {
  context: undefined,
  price: undefined,
  user: undefined,
  needRefund: undefined,
  fileId: undefined,
}

export default component()(Expense)
