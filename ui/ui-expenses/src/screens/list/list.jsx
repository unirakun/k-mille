import React from 'react'
import { component } from 'hoc'
import Add from '../../components/addButton'
import Expenses from './expenses'
import styles from './list.styles'

const List = () => (
  <div>
    <Expenses />
    <Add />
    <div className={styles.image}>
      <canvas id="resize" height="200" width="200" />
      <img id="source" />
    </div>
  </div>
)

export default component()(List)
