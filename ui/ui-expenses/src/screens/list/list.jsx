import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import Add from '../../components/addButton'
import Expenses from './expenses'
import styles from './list.styles'

const List = ({
  classes,
}) => (
  <div>
    <Expenses />
    <Add />
    <div className={classes.image}>
      <canvas id="resize" height="200" width="200" />
      <img id="source" alt="hidden" />
    </div>
  </div>
)

List.propTypes = {
  classes: PropTypes.object,
}

List.defaultProps = {
  classes: {},
}

export default component({ styles })(List)
