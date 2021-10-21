import { ThemeOptions } from '@material-ui/core'

import { createTheme } from '@material-ui/core/styles'

export const paletteColorsDark = {
  primary: '#5A5B5B',
  secondary: '#5A5B5B',
  card: '#5A5B5B',
  error: '#E44C65',
  background: '#36393F',
  text: '#F2F2F2',
}

export const paletteColorsLight = {
  primary: '#F2F2F2',
  secondary: '#FFFFFF',
  card: '#F2F2F2',
  error: '#E44C65',
  background: '#FFFFFF',
  text: '#050505',
}



const options = (dark: boolean): ThemeOptions => {
  const paletteColors = dark ?  paletteColorsLight : paletteColorsDark
  return {
    palette: {
      type: dark ?  'light': 'dark' ,
      primary: {
        light: paletteColors.primary,
        main: paletteColors.primary,
        dark: paletteColors.primary,
      },
      secondary: {
        main: paletteColors.secondary,
      },
      error: {
        main: paletteColors.error,
      },
      background: {
        default: paletteColors.background,
      },
      text: {
        primary: paletteColors.text,
      },
    },
    typography: {
      fontFamily: 'Chivo',
      h1: {
        fontFamily: 'Chivo',
        fontWeight: 300,
        fontSize: '96px',
        lineHeight: '127px',
        letterSpacing: '-1.5px',
      },
      h2: { fontFamily: 'Chivo', fontWeight: 500, fontSize: '32px', lineHeight: '38px'},
      h3: { fontFamily: 'Chivo', fontWeight: 500, fontSize: '1.7rem' },
      h4: { fontFamily: 'Chivo', fontWeight: 500, fontSize: '1.3rem' },
      h5: { fontFamily: 'Chivo', fontWeight: 700, fontSize: '15px', lineHeight: '24px', letterSpacing: '0.05px'},
      h6: { fontFamily: 'Chivo', fontWeight: 700, fontSize: '14px', lineHeight: '21px', letterSpacing: '0.05px' },
      subtitle1: { fontFamily: 'Chivo', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px' },
      subtitle2: {
        fontFamily: 'Chivo',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16.41px',
        letterSpacing: '0.1px',
      },
      body1: { fontFamily: 'Chivo',  fontWeight: 400, fontSize: '14px', lineHeight: '150%', letterSpacing: '0.5px' },
      body2: { fontFamily: 'Chivo',  fontWeight: 400, fontSize: '16px', lineHeight: '16px', letterSpacing: '0.25px' },
      button: { fontFamily: 'Chivo', fontWeight: 500, fontSize: '14px', letterSpacing: '1.25px' },
      caption: { fontFamily: 'Chivo', fontSize: '12px', lineHeight: '14px', letterSpacing: '0.4px' },
      overline: { fontFamily: 'Chivo', fontSize: '10px', lineHeight: '12px', letterSpacing: '1.5px' },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            height: '100%',
            padding: 0,
            margin: 0,
            width: '100vw',
          },
          body: {
            height: '100%',
            padding: 0,
            margin: 0,
            width: '100vw',
            overflowX: 'hidden',
          },
          a: {
            textDecoration: 'none',
            fontWeight: 900,
            color: paletteColors.text,
          },
        },
      },
    },
  }
}

export const darkTheme = createTheme(options(true))
export const lightTheme = createTheme(options(false))

export default darkTheme
