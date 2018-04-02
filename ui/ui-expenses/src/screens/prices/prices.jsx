import React from 'react'
import PropTypes from 'prop-types'
import File from '../../components/file'
import Price from './price'
import styles from './prices.styles'

const Prices = ({ prices, fileId }) => {
  const defaultSelected = prices[0]
  return (
    <div className={styles.prices}>
      <h2>Prix</h2>
      <div className={styles.pricesList}>
        {prices.map(price => (
          <Price key={price} price={price} selected={price === defaultSelected} />
        ))}
      </div>
      <File className={styles.file} id={fileId} name={`file-${fileId}`} />
    </div>
  )
}

Prices.propTypes = {
  prices: PropTypes.array,
  fileId: PropTypes.string,
}

Prices.defaultProps = {
  prices: [],
  fileId: undefined,
}

export default Prices
