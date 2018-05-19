import React from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import { component } from 'ui-hocs'

const Capture = ({
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
        <img width={50} height={50} src={capture} />
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
        screenshotFormat="image/webp"
        videoSource={device}
      />
      <button onClick={takeCapture}>take photo</button>
    </div>
  )
}

Capture.propTypes = {
  device: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  capture: PropTypes.string,
  useCamera: PropTypes.func,
  takeCapture: PropTypes.func,
  cancel: PropTypes.func,
}

Capture.defaultProps = {
  capture: undefined,
  useCamera: undefined,
  takeCapture: undefined,
  cancel: undefined,
}

export default component()(Capture)
