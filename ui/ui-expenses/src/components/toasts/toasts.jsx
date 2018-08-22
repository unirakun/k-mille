import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { component } from 'ui-hocs'
import Toast from './toast'
import styles from './toasts.styles'

const Toasts = ({
  className,
  classes,
  toasts,
}) => (
  <div className={cn('toasts', classes.main, className)}>
    {toasts.map(id => <Toast key={id} id={id} />)}
  </div>
)

Toasts.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  toasts: PropTypes.array,
}

Toasts.defaultProps = {
  className: '',
  classes: {},
  toasts: [],
}

export default component({ styles })(Toasts)
