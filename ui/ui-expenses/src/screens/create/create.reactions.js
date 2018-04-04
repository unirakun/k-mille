export const send = ((action, store, { http }) => {
  http('EXPENSES')
    .post(
      '/api/expenses',
      {
        client: 'CLIENT',
        price: store.ui.price.get(),
        fileId: store.data.fileId.get(),
        user: store.data.profile.get().name,
        needRefund: true,
      },
      { credentials: 'include' },
    )
})

export const respond = ((action) => {
  console.log(action)
})
