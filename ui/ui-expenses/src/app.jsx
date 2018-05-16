import React from 'react'
import { component } from 'hoc'
import Header from './components/header'
import List from './screens/list'
import Prices from './screens/prices'
import styles from './app.styles'

const App = () => (
  <div className={styles.container}>
    <Header />

    {/* screens */}
    <List />
    <Prices />
  </div>
)

export default component()(App)
