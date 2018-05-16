import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { component } from 'hoc'
import Price from './price'
import Context from './context'
import NeedRefund from './needRefund'
import Taxe from './taxe'
import styles from './prices.styles'

const taxes = [0.2, 0.1, 0.055, 0, 'n/a']

const contexts = [
  {
    name: 'alakarte',
    src: '/logo.png',
  },
  {
    name: 'Fabien',
    src: 'https://avatars1.githubusercontent.com/u/17828231?s=460&v=4',
  },
  {
    name: 'Guillaume',
    src: 'https://avatars1.githubusercontent.com/u/26094222?s=460&v=4',
  },
  {
    name: 'input',
  },
]

const Prices = ({
  prices,
  response,
  add,
  cancel,
}) => (
  <Fragment>
    <div className={styles.block}>
      <h2>Prix</h2>
      <div className={styles.buttons}>
        {prices.map(price => (
          <Price key={price} price={price} selected={price === prices[0]} />
        ))}
      </div>
    </div>
    <div className={styles.block}>
      <h2>Contexte</h2>
      <div className={styles.buttons}>
        {contexts.map(context => (
          <Context key={context.name} {...context} selected={context.name === contexts[0].name} />
        ))}
      </div>
    </div>
    <div className={styles.block}>
      <h2>TVA</h2>
      <div className={styles.buttons}>
        {taxes.map(taxe => (
          <Taxe key={taxe} taxe={taxe} selected={taxe === taxes[0]} />
        ))}
      </div>
    </div>
    <div className={styles.block}>
      <NeedRefund />
    </div>
    <div className={styles.block}>
      <div className={styles.buttons}>
        <button onClick={add}>ADD</button>
        <button onClick={cancel}>CANCEL</button>
      </div>
    </div>
    <div>{response}</div>
  </Fragment>
)

Prices.propTypes = {
  prices: PropTypes.array,
  response: PropTypes.string,
  add: PropTypes.func,
  cancel: PropTypes.func,
}

Prices.defaultProps = {
  prices: [],
  response: '',
  add: undefined,
  cancel: undefined,
}

export default component()(Prices)
