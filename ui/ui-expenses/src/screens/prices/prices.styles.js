import css from 'css'
import { colors } from 'app.styles'

export default css({
  container: {
    margin: '1em 1.5em',
    '> h2': {
      fontSize: '1em',
    },
  },
  prices: {
    display: 'grid',
    gridTemplateColumns: 'auto 40px',
    gridGap: '10px',
    '& .list': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 2fr)',
      gridGap: '10px',
    },
    '& button': {
      border: `2px solid ${colors.mainColor}`,
      borderRadius: '3px',
      backgroundColor: colors.mainColor,
      fontSize: '14px',
      color: 'white',
    },
  },
  priceInput: {
    display: 'grid',
    gridTemplateColumns: '2fr auto',
    gridGap: '10px',
    '& .input': {
      border: `2px solid ${colors.blue}`,
      borderRadius: '3px',
      outlineColor: colors.blue,
      padding: '.7em',
      fontSize: '14px',
    },
    '& button': {
      border: `2px solid ${colors.lightGrey}`,
      backgroundColor: colors.lightGrey,
      color: colors.grey,
      borderRadius: '3px',
      fontSize: '14px',
    },
  },
})
