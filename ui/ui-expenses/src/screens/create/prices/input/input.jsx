import React from 'react'
import PropTypes from 'prop-types'
import styles from '../prices.styles'

const Input = ({ prices, toggleInput, onChange }) => (
  <div className={styles.priceInput}>
    <input type="number" className="input" autoFocus onChange={onChange} />
    {!!prices.length && <button onClick={toggleInput}>ANNULER</button>}
  </div>
)

Input.propTypes = {
  prices: PropTypes.array,
  toggleInput: PropTypes.func,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  prices: [],
  toggleInput: undefined,
  onChange: undefined,
}

export default Input
