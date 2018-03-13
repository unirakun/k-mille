import React from 'react'
import { Link } from 'redux-little-router'

export default ({ invoices, onRemove }) => (
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
