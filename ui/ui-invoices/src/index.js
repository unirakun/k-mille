import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-core/register'
import 'babel-polyfill'
import App from './app.container'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
