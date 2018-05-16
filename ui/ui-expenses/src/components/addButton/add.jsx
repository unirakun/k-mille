import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'hoc'
import styles from './add.styles'

const Add = ({ selectFile, onFileSelected, onSubmit }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={selectFile}
    onKeyPress={this.selectFile}
    className={styles.container}
  >
    <div className={styles.button}>
      <content className={styles.content}>+</content>
    </div>
    <form id="fileForm" onSubmit={onSubmit} className={styles.form} >
      <input type="file" id="file" onChange={onFileSelected} className={styles.input} />
      <input type="submit" id="fileSubmit" />
    </form>
  </div>
)

Add.propTypes = {
  selectFile: PropTypes.func.isRequired,
  onFileSelected: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default component()(Add)
