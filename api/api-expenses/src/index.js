/* eslint-disable global-require */
const server = require('server')

server({
  scope: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
  resources: [require('./images'), require('./expenses'), require('./emails')],
})
