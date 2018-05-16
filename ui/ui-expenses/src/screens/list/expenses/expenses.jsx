import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'hoc'
import Expense from './expense'

const Expenses = ({ expenses }) => (
  <table>
    <thead>
      <tr>
        <th>Context</th>
        <th>Price</th>
        <th>Refound</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map(id => <Expense key={id} id={id} />)}
    </tbody>
  </table>
)

Expenses.propTypes = {
  expenses: PropTypes.array,
}

Expenses.defaultProps = {
  expenses: [],
}

export default component()(Expenses)
