import React from 'react'
import Header from './components/header'
import Main from './screens/main'
import styles from './app.styles'

const App = () => (
  <div className={styles.container}>
    <Header />
    <Main />
  </div>
)

export default App
