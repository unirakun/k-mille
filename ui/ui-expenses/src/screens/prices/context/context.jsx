import React from 'react'
import PropTypes from 'prop-types'
import styles from './context.styles'

const Context = ({
  name,
  src,
  selected,
  onChange,
}) => (
  <label htmlFor={name} className={styles.main}>
    <input type="radio" id={name} name="context" className={styles.input} defaultChecked={selected} onChange={onChange} />
    <img src={src} alt={name} className={styles.avatar} />
  </label>
)

Context.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Context.defaultProps = {
  src: undefined,
  selected: false,
  onChange: undefined,
}

export default Context
