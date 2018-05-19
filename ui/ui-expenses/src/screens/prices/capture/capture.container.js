import { container } from 'ui-hocs'
import Component from './capture'


const mapStore = (store, ownProps, { camera, window }) => ({
  device: camera.getCameras()[0],
  capture: camera.getCapture(),
  useCamera: camera.useCamera,
  takeCapture: camera.takeCapture,
  cancel: camera.removeCapture,
  height: window.innerHeight / 3,
  width: window.innerWidth / 1.1,
})

export default container({ mapStore })(Component)
