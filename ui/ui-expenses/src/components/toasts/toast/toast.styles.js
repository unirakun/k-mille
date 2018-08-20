import { colors } from 'app.styles'

const time = '.5s'

export default {
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.black,
    padding: '1em',
    borderRadius: '5px',
    width: 'auto',
    height: 'auto',
    transition: `transform ${time} ease-in-out`,
    transform: ({ printed }) => (printed ? 'translateX(0)' : 'translateX(25em)'),
    animation: ({ printed }) => (printed ? '' : `remove .2s ease-in ${time} forwards`),

    '& > span': {
      margin: '0em 1em',
    },
  },
  message: {
    color: ({ level }) => colors[level],
    margin: '.5em 0',
    textTransform: 'uppercase',
  },
  icon: {
    fontSize: '2em',
  },
  button: {
    padding: '.8em 1.8em',
  },
  '@keyframes remove': {
    from: {
      maxHeight: '10em',
    },
    to: {
      maxHeight: '0',
      margin: '-1em',
    },
  },
}
