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

export default {
  getReducer: () => ({
    path: 'devices.cameras',
    reducer: {
      used: simpleObject(),
      list: simpleObject({ defaultData: [] }),
      capture: simpleObject({ defaultData: '' }),
    },
  }),
  getDriver: (store) => {
    store.listeners.add([
      when('@@krml/INIT')(setDevices),
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
