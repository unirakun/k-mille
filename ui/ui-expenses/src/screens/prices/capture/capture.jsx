import React from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import { component } from 'ui-hocs'
import styles from './capture.styles'

const Capture = ({
  classes,
  device,
  height,
  width,
  capture,
  useCamera,
  takeCapture,
  cancel,
}) => {
  if (capture) {
    return (
      <div>
        <img className={classes.image} src={capture} />
        <button onClick={cancel}>Cancel</button>
      </div>
    )
  }
  return (
    <div>
      <Webcam
        audio={false}
        height={height}
        width={width}
        ref={useCamera}
        screenshotFormat="image/jpeg"
        videoSource={device}
      />
      <button onClick={takeCapture}>take photo</button>
    </div>
  )
}

Capture.propTypes = {
  classes: PropTypes.object,
  device: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  capture: PropTypes.string,
  useCamera: PropTypes.func,
  takeCapture: PropTypes.func,
  cancel: PropTypes.func,
}

Capture.defaultProps = {
  classes: {},
  capture: undefined,
  useCamera: undefined,
  takeCapture: undefined,
  cancel: undefined,
}

export default component({ styles })(Capture)
