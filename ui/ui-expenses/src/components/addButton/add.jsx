import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import styles from './add.styles'

const Add = ({
  classes,
  selectFile,
  onFileSelected,
  onSubmit,
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={selectFile}
    onKeyPress={this.selectFile}
    className={classes.container}
  >
    <div className={classes.button}>
      <content className={classes.content}>+</content>
    </div>
    <form id="fileForm" onSubmit={onSubmit} className={classes.form} >
      <input type="file" id="file" onChange={onFileSelected} className={classes.input} />
      <input type="submit" id="fileSubmit" />
    </form>
  </div>
)

Add.propTypes = {
  classes: PropTypes.object,
  selectFile: PropTypes.func.isRequired,
  onFileSelected: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

Add.defaultProps = {
  classes: {},
}

export default component({ styles })(Add)
