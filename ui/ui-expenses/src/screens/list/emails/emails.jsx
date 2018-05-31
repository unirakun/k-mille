import React from 'react'
import PropTypes from 'prop-types'
import { component } from 'ui-hocs'

const Emails = ({
  emails,
}) => (
  <div>
    {JSON.stringify(emails)}
  </div>
)

Emails.propTypes = {
  emails: PropTypes.object,
}

Emails.defaultProps = {
  emails: undefined,
}

export default component()(Emails)
