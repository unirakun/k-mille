import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import { Link } from '@k-redux-router/react-k-ramel'
import Invoice from './invoice'

const List = ({ invoices }) => (
  <div>
    <Link code="create">create</Link>
    {invoices.map(id => (<Invoice key={id} id={id} />))}
  </div>
)

List.propTypes = {
  invoices: PropTypes.array,
}

List.defaultProps = {
  invoices: [],
}

export default component()(List)
