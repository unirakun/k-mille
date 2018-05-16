import { when, keyValue, simpleObject } from 'k-ramel'

const setCameras = (action, store) => {
  navigator.mediaDevices.enumerateDevices()
    .then(console.log)
}

export default {
  getReducer: () => ({
    path: 'ui.device',
    reducer: {
      cameras: simpleObject({ defaultData: [] }),
      screenshots: keyValue({ key: 'id' }),
    },
  }),
  getDriver: store => {
    store.listeners.add([
      when('@@krml/INIT')(setCameras),
    ])

    return ({
      // selectors
      getCameras: store.device.cameras.get,
    })
  }
}
