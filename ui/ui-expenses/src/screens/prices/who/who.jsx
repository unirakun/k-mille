import React from 'react'
import PropTypes from 'prop-types'
import styles from './who.styles'

const Who = ({
  name,
  src,
  selected,
  onChange,
}) => (
  <label htmlFor={name} className={styles.who}>
    <input type="radio" id={name} name="who" className={styles.input} defaultChecked={selected} onChange={onChange} />
    {src && <img src={src} alt={name} className={styles.avatar} />}
    {!src && <div>{name}</div>}
  </label>
)

Who.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

Who.defaultProps = {
  src: undefined,
  selected: false,
  onChange: undefined,
}

export default Who
