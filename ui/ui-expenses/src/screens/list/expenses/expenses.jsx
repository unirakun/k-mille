import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'hoc'
import Expense from './expense'

const Expenses = ({ expenses }) => (
  <div>
    {expenses.map(id => <Expense key={id} id={id} />)}
  </div>
)

Expenses.propTypes = {
  expenses: PropTypes.array,
}

Expenses.defaultProps = {
  expenses: [],
}

export default component()(Expenses)
