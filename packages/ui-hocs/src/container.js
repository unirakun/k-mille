import PropTypes from 'prop-types'
import { compose, withContext } from 'recompose'
import { inject, listen } from '@k-ramel/react'
import router from 'hoc-little-router'

export default ({
  screenName,
  name,
  listeners,
  form,
  mapStore,
} = {}) => {
  const hocs = []
  // route (hide or not the component)
  if (screenName) hocs.push(router.absolute(screenName))

  // listeners
  if (listeners) hocs.push(listen(listeners, screenName || name))

  // form to the context (only if not present into props)
  if (form) {
    hocs.push(withContext(
      { form: PropTypes.string },
      props => ({ form: (props.form || form) }),
    ))
  }

  // map store to props
  if (mapStore) hocs.push(inject(mapStore))

  return compose(...hocs)
}
