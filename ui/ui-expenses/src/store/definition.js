import { types } from 'k-ramel'

export default {
  data: {
    profile: types.object(),
    fileId: types.string(),
    prices: types.array(),
    expenses: types.keyValue(),
    emails: types.object(),
  },
  ui: {
    header: types.object({ defaultData: { title: 'envoi' } }),
    list: types.array(),
    price: types.number(),
    context: types.number(),
    needRefund: types.bool(),
    taxe: types.number(),
    notifications: types.keyValue(),
  },
}
