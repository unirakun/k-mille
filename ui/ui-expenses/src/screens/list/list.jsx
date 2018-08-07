import React from 'react'
import { component } from 'ui-hocs'
import Add from '../../components/addButton'
import Expenses from './expenses'
import Emails from './emails'
import styles from './list.styles'

const List = () => (
  <div>
    <Emails />
    <Expenses />
    <Add />
  </div>
)

export default component({ styles })(List)
