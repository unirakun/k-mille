import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './send.styles'

const Send = ({ sendFiles }) => (
  <button onClick={sendFiles} className={styles.send}>
    <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </button>
)

Send.propTypes = {
  sendFiles: PropTypes.func.isRequired,
}

export default component()(Send)
