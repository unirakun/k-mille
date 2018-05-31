import { when } from 'k-ramel'
import { sendOnDrive, setFileId, resetCapture, removeFileId } from './capture.reactions'

export default [
  when('@@krf/SET>DEVICES_CAMERAS>CAPTURE')(sendOnDrive),
  when('@@http/IMAGES>POST>ENDED')(setFileId),
  when('@@http/IMAGES>POST>FAILED')(resetCapture),
  when('@@http/IMAGES>DELETE>ENDED')(resetCapture),
  when('@@camera/REMOVE_CAPTURE')(removeFileId),
]
