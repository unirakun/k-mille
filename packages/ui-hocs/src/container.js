import PropTypes from 'prop-types'
import { compose, withContext } from 'recompose'
import { inject, listen } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import loaderHoc from 'hoc-react-loader/build/core'
import LoadingIndicator from './loadingIndicator'

export default ({
  screenName,
  name,
  listeners,
  form,
  mapStore,
  loader,
} = {}) => {
  const hocs = []
  // route (hide or not the component)
  if (screenName) hocs.push(forRoute.absolute(screenName))

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

  // loader (hide/show elements)
  if (loader) {
    const options = { LoadingIndicator }

    if (typeof loader === 'string') {
      options.print = [loader]
    }

    hocs.push(loaderHoc(options))
  }

  return compose(...hocs)
}
