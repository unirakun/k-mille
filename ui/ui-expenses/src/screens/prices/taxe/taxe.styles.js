import { merge, select } from 'glamor'
import css from 'css'
import { colors } from 'app.styles'

export default css({
  taxe: {
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
      backgroundColor: colors.green,
      borderRadius: '3px',
      fontSize: '14px',
      color: 'white',
      textAlign: 'center',
    }),
    select(':checked + div', {
      filter: 'brightness(75%)',
    }),
  ),
})
