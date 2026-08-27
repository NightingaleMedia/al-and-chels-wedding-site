import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // small: < 768px
      sm: 768, // large: ≥ 768px (use lg: in Tailwind)
      md: 768,
      lg: 768,
      xl: 768,
    },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    h1: {
      // fontSize: 'clamp(3.2rem, 12vw, 4.2rem)',
      // fontSize: 'unset',
      fontSize: '3rem',
      // lineHeight: 0.2,
      // letterSpacing: '0.01em',
      // fontWeight: 700,
      fontFamily: 'var(--font-monotype)',
      // textTransform: 'unset',
    },
    body1: {
      fontFamily: 'var(--font-body1)',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'var(--font-body1)',
      color: grey[600],
    },
    caption: {
      fontFamily: 'var(--font-secondary)',
    },
  },
})
export default theme
