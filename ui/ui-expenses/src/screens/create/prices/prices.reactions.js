export const setPrice = (({ payload }, store) => {
  store.ui.create.selectedPrice.set(payload)
})

export const toggleInput = ((action, store) => {
  store.ui.create.showInput.set(!store.ui.create.showInput.get())
})
