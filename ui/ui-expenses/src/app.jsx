import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import Header from './components/header'
import List from './screens/list'
import Prices from './screens/prices'
import styles from './app.styles'

const App = ({
  classes,
}) => (
  <div className={classes.container}>
    <Header />

    {/* screens */}
    <List />
    <Prices />
  </div>
)

App.propTypes = {
  classes: PropTypes.object,
}

App.defaultProps = {
  classes: {},
}

export default component({ styles })(App)
