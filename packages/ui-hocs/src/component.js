import { compose, onlyUpdateForPropTypes } from 'recompose'
import jss from 'react-jss'

export default ({ styles, optimize = true } = {}) => (Component) => {
  const hocs = []

  if (styles) hocs.push(jss(styles))
  if (optimize && Component.propTypes) hocs.push(onlyUpdateForPropTypes)

  return compose(...hocs)(Component)
}
