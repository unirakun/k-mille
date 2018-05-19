import { when, simpleObject } from 'k-ramel'

const setDevices = async (action, store, { window }) => {
  const devices = await window.navigator.mediaDevices.enumerateDevices()
  store.devices.cameras.list.set(devices
    .filter(device => device.kind === 'videoinput')
    .map(device => device.deviceId))
}

const takeCapture = (store) => {
  const camera = store.devices.cameras.used.get()
  store.devices.cameras.capture.set(camera.getScreenshot())
}

export const sendOnDrive = ((action, store, { http, camera }) => {
  http('IMAGES').post('/api/images', {
    image: camera.getCapture().replace(/data:.*;base64,/, ''),
    user: store.data.profile.get().name,
  })
})

const setGoogleId = (({ payload }, store) => store.devices.cameras.googleId.set(payload.fileId))

const removeGoogleId = ((action, store, { http }) =>
  http('IMAGES').delete(`/api/images/${store.devices.cameras.googleId.get()}`))

const resetCapture = ((action, store) => {
  store.devices.cameras.googleId.reset()
  store.devices.cameras.capture.reset()
})

export default {
  getReducer: () => ({
    path: 'devices.cameras',
    reducer: {
      used: simpleObject(),
      list: simpleObject({ defaultData: [] }),
      capture: simpleObject({ defaultData: '' }),
      googleId: simpleObject({ defaultData: '' }),
    },
  }),
  getDriver: (store) => {
    store.listeners.add([
      when('@@krml/INIT')(setDevices),
      when('@@krf/SET>DEVICES_CAMERAS>CAPTURE')(sendOnDrive),
      when('@@http/IMAGES>POST>ENDED')(setGoogleId),
      when('@@http/IMAGES>POST>FAILED')(resetCapture),
      when('@@http/IMAGES>DELETE>ENDED')(resetCapture),
      when('@@camera/REMOVE_CAPTURE')(removeGoogleId),
    ])

    return ({
      getCameras: store.devices.cameras.list.get,
      getCameraUsed: store.devices.cameras.used.get,
      getCapture: store.devices.cameras.capture.get,
      useCamera: store.devices.cameras.used.set,
      takeCapture: () => takeCapture(store),
      removeCapture: () => store.dispatch({ type: '@@camera/REMOVE_CAPTURE' }),
    })
  },
}
