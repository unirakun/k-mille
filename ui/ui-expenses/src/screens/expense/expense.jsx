import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import Price from './price'
import Context from './context'
import NeedRefund from './needRefund'
import Taxe from './taxe'
import styles from './expense.styles'

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

const Expense = ({
  classes,
  prices,
  add,
  cancel,
}) => (
  <Fragment>
    <div className={classes.block}>
      <h2>Prix</h2>
      <div className={classes.buttons}>
        {prices.map(price => (
          <Price key={price} price={price} selected={price === prices[0]} />
        ))}
      </div>
    </div>
    <div className={classes.block}>
      <h2>Contexte</h2>
      <div className={classes.buttons}>
        {contexts.map(context => (
          <Context key={context.name} {...context} selected={context.name === contexts[0].name} />
        ))}
      </div>
    </div>
    <div className={classes.block}>
      <h2>TVA</h2>
      <div className={classes.buttons}>
        {taxes.map(taxe => (
          <Taxe key={taxe} taxe={taxe} selected={taxe === taxes[0]} />
        ))}
      </div>
    </div>
    <div className={classes.block}>
      <NeedRefund />
    </div>
    <div className={classes.block}>
      <div className={classes.buttons}>
        <button onClick={add}>ADD</button>
        <button onClick={cancel}>CANCEL</button>
      </div>
    </div>
  </Fragment>
)

Expense.propTypes = {
  classes: PropTypes.object,
  prices: PropTypes.array,
  add: PropTypes.func,
  cancel: PropTypes.func,
}

Expense.defaultProps = {
  classes: {},
  prices: [],
  add: undefined,
  cancel: undefined,
}

export default component({ styles })(Expense)
