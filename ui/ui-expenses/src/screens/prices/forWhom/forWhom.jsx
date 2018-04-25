import React from 'react'
import PropTypes from 'prop-types'
import styles from './forWhom.styles'

const forWhom = ({
  name,
  src,
  selected,
  onChange,
}) => (
  <label htmlFor={name} className={styles.who}>
    <input type="radio" id={name} name="forWhom" className={styles.input} defaultChecked={selected} onChange={onChange} />
    <img src={src} alt={name} className={styles.avatar} />
  </label>
)

forWhom.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

forWhom.defaultProps = {
  src: undefined,
  selected: false,
  onChange: undefined,
}

export default forWhom
