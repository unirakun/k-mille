import { merge, select } from 'glamor'
import css from 'css'
import { colors } from 'app.styles'

export default css({
  who: {
    display: 'inline-block',
  },
  avatar: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    padding: '.3em',
    margin: '1em',
  },
  input: merge(
    {
      position: 'absolute',
      opacity: 0,
    },
    select(':checked + img', {
      filter: 'brightness(75%)',
      border: `solid 1px ${colors.blue}`,
    }),
  ),
})
