import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

const List = ({ invoices, onRemove }) => (
  <div>
    <Link href="/invoice">create</Link>

    {invoices.map(invoice => (
      <div>
        <div>Invoice: {invoice.id}</div>
        <button onClick={() => onRemove(invoice.id)}>remove</button>
        <pre>{JSON.stringify(invoice, null, 2)}</pre>
      </div>
    ))}
  </div>
)

List.propTypes = {
  invoices: PropTypes.object,
  onRemove: PropTypes.func,
}

List.defaultProps = {
  invoices: {},
  onRemove: undefined,
}

export default List
