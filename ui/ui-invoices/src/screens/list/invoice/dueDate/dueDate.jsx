import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'

const DueDate = ({
  invoiceId,
  since,
  priceTTC,
  paid,
  onPaid,
}) => {
  if (paid) return ''
  return (
    <div>
      <div>since : {since}</div>
      <div>price : {priceTTC}</div>
      {invoiceId.includes('draft') || <button onClick={() => onPaid()}>paid</button>}
      <hr />
    </div>
  )
}

DueDate.propTypes = {
  invoiceId: PropTypes.string.isRequired,
  since: PropTypes.string,
  priceTTC: PropTypes.string,
  paid: PropTypes.bool,
  onPaid: PropTypes.func,
}

DueDate.defaultProps = {
  since: undefined,
  priceTTC: undefined,
  paid: false,
  onPaid: undefined,
}

export default component()(DueDate)
