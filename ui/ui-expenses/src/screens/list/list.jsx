import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import Add from '../../components/addButton'
import Expenses from './expenses'
import Emails from './emails'
import styles from './list.styles'

const List = ({
  classes,
}) => (
  <div>
    <Emails />
    <Expenses />
    <Add />
  </div>
)

List.propTypes = {
  classes: PropTypes.object,
}

List.defaultProps = {
  classes: {},
}

export default component({ styles })(List)
