import { router } from '@k-redux-router/react-k-ramel'

const routes = {
  '/': {
    code: 'list',
    '/expense': { code: 'expense' },
  },
}

export default router({ routes })
