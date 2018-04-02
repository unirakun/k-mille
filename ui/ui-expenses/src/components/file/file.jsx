import React from 'react'
import PropTypes from 'prop-types'
import styles from './file.styles'

const File = ({ name, id }) => (
  <a href={`https://drive.google.com/uc?export=view&id=${id}`}>
    <img className={styles.img} src={`https://drive.google.com/uc?export=view&id=${id}`} alt={name} />
  </a>
)

File.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
}

File.defaultProps = {
  name: undefined,
}

export default File
