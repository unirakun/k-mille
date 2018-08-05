export const sendOnDrive = ((action, store, { http, camera }) => {
  http('IMAGES').post('/api/images', {
    image: camera.getCapture().replace(/data:.*;base64,/, ''),
    user: store.data.profile.get().name,
  })
})

export const setFileId = (({ payload }, store) => store.data.fileId.set(payload.fileId))

export const removeFileId = ((action, store, { http }) => {
  http('IMAGES').delete(`/api/images/${store.data.fileId.get()}`)
})

export const resetCapture = ((action, store) => {
  store.data.fileId.reset()
  store.devices.cameras.capture.reset()
})
