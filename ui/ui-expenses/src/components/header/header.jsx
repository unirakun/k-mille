import React from 'react'
import PropTypes from 'prop-types'
import Send from './sendButton'
import styles from './header.styles'

const Header = ({ name, avatar, title }) => (
  <div className={styles.header}>
    <img src={avatar} alt={name} className={styles.avatar} />
    <h1 className={styles.title}>{title}</h1>
    {
      title === 'envoi' && <Send />
    }
  </div>
)

Header.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Header.defaultProps = {
  name: undefined,
  avatar: undefined,
}

export default Header
