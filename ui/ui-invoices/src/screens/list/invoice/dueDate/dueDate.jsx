import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'

const DueDate = ({
  invoiceId,
  since,
  priceTTC,
  onPaid,
}) => (
  <div>
    <div>since : {since}</div>
    <div>price : {priceTTC}</div>
    {invoiceId.includes('draft') || <button onClick={() => onPaid()}>paid</button>}
    <hr />
  </div>
)

DueDate.propTypes = {
  invoiceId: PropTypes.string.isRequired,
  since: PropTypes.string,
  priceTTC: PropTypes.string,
  onPaid: PropTypes.func,
}

DueDate.defaultProps = {
  since: undefined,
  priceTTC: undefined,
  onPaid: undefined,
}

export default component()(DueDate)
