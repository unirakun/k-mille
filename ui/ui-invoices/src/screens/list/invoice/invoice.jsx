import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'

const Invoice = ({
  id,
  clientName,
  since,
  priceTTC,
  fileId,
  onRemove,
}) => (
  <div>
    <div>Invoice: {id}</div>
    <div>to : {clientName}</div>
    <div>since : {since}</div>
    <div>price : {priceTTC}</div>
    {fileId && (
      <a href={`https://drive.google.com/uc?export=view&id=${fileId}`}>
        PDF
      </a>)}
    {id.includes('draft') && <button onClick={() => onRemove()}>remove</button>}
    <hr />
  </div>
)

Invoice.propTypes = {
  id: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  since: PropTypes.string,
  priceTTC: PropTypes.string,
  fileId: PropTypes.string,
  onRemove: PropTypes.func,
}

Invoice.defaultProps = {
  clientName: undefined,
  since: undefined,
  priceTTC: undefined,
  fileId: undefined,
  onRemove: undefined,
}

export default component()(Invoice)
