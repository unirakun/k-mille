import { colors } from 'app.styles'

export default {
  main: {
    display: 'inline-block',
  },
  avatar: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    padding: '.3em',
    margin: '1em',
  },
  input: {
    position: 'absolute',
    opacity: 0,

    '&:checked + img': {
      filter: 'brightness(75%)',
      border: `solid 1px ${colors.blue}`,
    },
  },
}
