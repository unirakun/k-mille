import React from 'react'
import Header from './components/header'
import List from './screens/list'
import styles from './app.styles'

const App = () => (
  <div className={styles.container}>
    <Header />
    <List />
  </div>
)

export default App
