import driver from '@k-ramel/driver-redux-little-router'

const routes = {
  '/': {
    title: 'list',
    '/expense': { title: 'create' },
    '/invoice/:id': { title: 'expense' },
  },
}

export default driver(routes, state => state.router)
