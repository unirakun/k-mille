import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { component } from 'ui-hocs'
import styles from './toast.styles'

const Toast = ({
  classes,
  className,
  message,
}) => (
  <div className={cn('toast', classes.main, className)}>
    <span>
      <p className={classes.message}>{message}</p>
    </span>
  </div>
)

Toast.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
}

Toast.defaultProps = {
  classes: {},
  className: '',
}

export default component({ styles })(Toast)
