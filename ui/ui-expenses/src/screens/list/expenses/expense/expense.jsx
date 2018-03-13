import React from 'react'
import PropTypes from 'prop-types'

const Expense = ({
  client,
  price,
  user,
  needRefund,
  fileId,
}) => (
  <div>
    <div>{client}</div>
    <div>{price}</div>
    <div>{fileId}</div> {/* TODO: make it a google link, and an action icon */}
    <div>{user}</div> {/* TODO: use this a a color (violet: fabien / bleu: guillaume) */}
    <div>{needRefund}</div> {/* TODO: make it an icon */}
  </div>
)

Expense.propTypes = {
  client: PropTypes.string,
  price: PropTypes.number,
  user: PropTypes.string,
  needRefund: PropTypes.bool,
  fileId: PropTypes.string,
}

Expense.defaultProps = {
  client: undefined,
  price: undefined,
  user: undefined,
  needRefund: undefined,
  fileId: undefined,
}

export default Expense
