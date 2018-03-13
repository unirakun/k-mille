import css from 'css'
import { colors } from 'app.styles'

const buttonSize = '56px'

export default css({
  container: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    outline: 'none',
  },
  button: {
    position: 'relative',
    width: buttonSize,
    height: buttonSize,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: colors.mainColor,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
  },
  form: {
    display: 'none',
  },
  content: {
    display: 'block',
    position: 'relative',
    width: buttonSize,
    height: buttonSize,
    color: colors.white,
    lineHeight: buttonSize,
    textAlign: 'center',
  },
})
