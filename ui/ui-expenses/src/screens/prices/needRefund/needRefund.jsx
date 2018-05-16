import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './needRefund.styles'

const NeedRefund = ({ checked, onChange }) => (
  <label htmlFor="needRefund" className={styles.price}>
    Se faire rembourser ?
    <input type="checkbox" id="needRefund" defaultChecked={checked} onChange={onChange} />
  </label>
)

NeedRefund.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}

NeedRefund.defaultProps = {
  checked: false,
  onChange: undefined,
}

export default component()(NeedRefund)
