import { compose, onlyUpdateForPropTypes } from 'recompose'

export default ({ optimize = true } = {}) => (Component) => {
  const hocs = []

  if (optimize && Component.propTypes) hocs.push(onlyUpdateForPropTypes)

  return compose(...hocs)(Component)
}
