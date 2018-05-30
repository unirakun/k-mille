import { colors } from 'app.styles'

export default {
  header: {
    backgroundColor: colors.mainColor,
    boxShadow: `
      0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12)
    `,
    display: 'flex',
    alignItems: 'center',
    height: '56px',
  },

  avatar: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    padding: '16px',
  },

  title: {
    fontSize: '1em',
    color: colors.white,
    fontWeight: 'normal',
    textTransform: 'capitalize',
    flexGrow: 2,
    marginLeft: '16px',
  },
}
