import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Price from './price'
import Taxe from './taxe'
import styles from './prices.styles'

const taxes = [20, 10, 5.5]

const Prices = ({ prices, response, add }) => {
  <Fragment>
    <div className={styles.block}>
      <h2>Prix</h2>
      <div className={styles.buttons}>
        {prices.map(price => (
          <Price key={price} price={price} selected={price === prices[0]} />
        ))}
      </div>
      <button onClick={add}>ADD</button>
      <div>{response}</div>
    </div>
    <div className={styles.block}>
      <h2>TVA</h2>
      <div className={styles.buttons}>
        {taxes.map(taxe => (
          <Taxe key={taxe} taxe={taxe} selected={taxe === taxes[0]} />
        ))}
      </div>
    </div>
  </Fragment>
)

Prices.propTypes = {
  prices: PropTypes.array,
  response: PropTypes.string,
  add: PropTypes.func,
}

Prices.defaultProps = {
  prices: [],
  response: '',
  add: undefined,
}

export default Prices
