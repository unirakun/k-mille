import { merge, select } from 'glamor'
import css from 'css'
import { colors } from 'app.styles'

export default css({
  price: {
    display: 'inline-block',
  },
  input: merge(
    {
      position: 'absolute',
      opacity: 0,
    },
    select('& + div', {
      padding: '.7em',
      minWidth: '4em',
      border: `2px solid ${colors.blue}`,
      borderRadius: '3px',
      fontSize: '14px',
      color: colors.blue,
      textAlign: 'center',
    }),
    select(':checked + div', {
      backgroundColor: colors.blue,
      color: 'white',
    }),
  ),
})
