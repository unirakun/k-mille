import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './needRefund.styles'

const NeedRefund = ({
  classes,
  checked,
  onChange,
}) => (
  <label htmlFor="needRefund" className={classes.price}>
    Se faire rembourser ?
    <input type="checkbox" id="needRefund" defaultChecked={checked} onChange={onChange} />
  </label>
)

NeedRefund.propTypes = {
  classes: PropTypes.object,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}

NeedRefund.defaultProps = {
  classes: {},
  checked: false,
  onChange: undefined,
}

export default component({ styles })(NeedRefund)
