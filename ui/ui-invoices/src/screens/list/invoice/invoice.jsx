import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import DueDate from './dueDate'

const Invoice = ({
  id,
  clientName,
  since,
  priceTTC,
  fileId,
  timetable,
  onRemove,
  onPaid,
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
    {id.includes('draft') && <button onClick={onRemove}>remove</button>}
    {id.includes('draft') || <button onClick={onPaid}>paid</button>}
    {timetable.map(dueDate => (
      <DueDate key={dueDate} invoiceId={id} id={dueDate} />
    ))}
    <hr />
  </div>
)

Invoice.propTypes = {
  id: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  since: PropTypes.string,
  priceTTC: PropTypes.string,
  fileId: PropTypes.string,
  timetable: PropTypes.array,
  onRemove: PropTypes.func,
  onPaid: PropTypes.func,
}

Invoice.defaultProps = {
  clientName: undefined,
  since: undefined,
  priceTTC: undefined,
  fileId: undefined,
  timetable: [],
  onRemove: undefined,
  onPaid: undefined,
}

export default component()(Invoice)
