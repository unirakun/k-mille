/* eslint-env browser */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-core/register'
import 'babel-polyfill'
import App from './app.container'
// FIXME: import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
// FIXME: registerServiceWorker()
