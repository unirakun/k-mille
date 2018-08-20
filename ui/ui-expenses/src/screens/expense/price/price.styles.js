import { colors } from 'app.styles'

export default {
  price: {
    display: 'inline-block',
    margin: '.2em 0',
  },
  input: {
    position: 'absolute',
    opacity: 0,

    '& + div': {
      padding: '.7em',
      minWidth: '4em',
      backgroundColor: colors.blue,
      borderRadius: '3px',
      fontSize: '14px',
      color: 'white',
      textAlign: 'center',
    },
    '&:checked + div': {
      filter: 'brightness(75%)',
    },
  },
}
