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
      dark: '#4e2d11',
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
    // // Custom Paper variant for form containers
    // // This variant provides a consistent styled container for forms across the site
    // // Customize the visual properties below to match your design requirements
    // MuiPaper: {
    //   variants: [
    //     {
    //       props: { variant: 'form' },
    //       style: ({ theme }) => ({
    //         // Customize padding for form container
    //         padding: theme.spacing(3),

    //         // Customize elevation/shadow
    //         boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    //         // Customize border style and color
    //         border: '1px solid rgba(0, 0, 0, 0.12)',
    //         // Customize background color
    //         backgroundColor: '#e3ccbe',
    //         // Customize corner rounding
    //         borderRadius: 0,
    //       }),
    //     },
    //   ],
    // },
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
      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', // 16px → 18px
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
