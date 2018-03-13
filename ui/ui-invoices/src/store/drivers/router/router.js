import driver from '@k-ramel/driver-redux-little-router'

const routes = {
  '/': {
    title: 'list',
    '/invoice': { title: 'create' },
    '/invoice/:id': { title: 'invoice' },
  },
}

export default driver(routes, state => state.router)
