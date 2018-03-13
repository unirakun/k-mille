import { css } from 'glamor'

export default styles => Object
  .keys(styles)
  .reduce(
    (acc, curr) => ({ ...acc, [curr]: css(styles[curr]) }),
    {},
  )
