import React from 'react'
import PropTypes from 'prop-types'
import Add from '../../components/addButton'
import Prices from '../prices'
import styles from './main.styles'

const Main = ({ fileId, title }) => (
  <div>
    <Add />
    {title === 'ajout' && <Prices />}
    {!!fileId && <span>{fileId}</span>}
    <div className={styles.image}>
      <canvas id="resize" height="200" width="200" />
      <img id="source" />
    </div>
  </div>
)

Main.propTypes = {
  fileId: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Main.defaultProps = {
  fileId: undefined,
}

export default Main
