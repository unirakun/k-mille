import React from 'react'
import { component } from 'ui-hocs'
import Invoice from './screens/invoice'
import List from './screens/list'

const App = () => (
  <div>
    {/* screens */}
    <Invoice />
    <List />
  </div>
)

export default component()(App)
