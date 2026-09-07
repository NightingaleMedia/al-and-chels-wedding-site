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
      main: '#0b0b0b',
      //#endregion
    },
    background: {
      default: '#F8F1D6',
      paper: '#fffaf1',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ul: {
          padding: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          minHeight: '55px',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '55px',
        },
      },
    },
  },

  typography: {
    h1: {
      fontSize: 'clamp(2rem, 8vw, 3rem)', // Responsive: 32px mobile → 48px desktop
      fontFamily: 'var(--font-monotype)',
      lineHeight: 1.2,
      fontWeight: 400,
      textTransform: 'uppercase',
      color: '#4e2d11',
    },
    h2: {
      fontSize: 'clamp(1.5rem, 6vw, 2.25rem)', // 24px → 36px
      fontFamily: 'var(--font-monotype)',
      lineHeight: 1.3,
      fontWeight: 400,
    },
    h3: {
      fontSize: 'clamp(1.25rem, 5vw, 1.875rem)', // 20px → 30px
      fontFamily: 'var(--font-archivo-black)',
      lineHeight: 1.4,
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    h4: {
      fontSize: 'clamp(1.125rem, 4vw, 1.5rem)', // 18px → 24px
      fontFamily: 'var(--font-archivo-black)',
      lineHeight: 1.4,
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)', // 16px → 20px
      fontFamily: 'var(--font-body1)',
      lineHeight: 1.5,
      fontWeight: 700,
    },
    h6: {
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // 14px → 16px
      fontFamily: 'var(--font-body1)',
      lineHeight: 1.5,
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'var(--font-body1)',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'var(--font-body1)',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: grey[600],
    },
    caption: {
      fontFamily: 'var(--font-secondary)',
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
})
export default theme
