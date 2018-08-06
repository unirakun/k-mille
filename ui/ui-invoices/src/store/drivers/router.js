import { router } from '@k-redux-router/react-k-ramel'

const routes = {
  '/': {
    code: 'list',
    '/invoice': { code: 'create' },
    '/invoice/:id': { code: 'invoice' },
  },
}

export default router({ routes })
