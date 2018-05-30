import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'
import Send from './sendButton'
import styles from './header.styles'

const Header = ({
  classes,
  name,
  avatar,
  title,
}) => (
  <div className={classes.header}>
    <img src={avatar} alt={name} className={classes.avatar} />
    <h1 className={classes.title}>{title}</h1>
    {
      title === 'envoi' && <Send />
    }
  </div>
)

Header.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  avatar: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Header.defaultProps = {
  classes: undefined,
  name: undefined,
  avatar: undefined,
}

export default component({ styles })(Header)
