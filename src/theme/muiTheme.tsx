import theme from 'theme/theme';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    third: {
      main: string;
    },
    fourth: {
      main: string;
    },
  }
  interface PaletteOptions {
    third?: {
      main: string;
    },
    fourth?: {
      main: string;
    },
  }
  interface Background {
    light: string;
  }
  interface BackgroundOptions {
    light?: string;
  }
}

const muiThemeProps = {
  palette: {
    primary: {
      light: theme.colors.cA,
      main: theme.colors.cA,
      dark: theme.colors.cA,
    },
    secondary: {
      light: theme.colors.cB,
      main: theme.colors.cB,
      dark: theme.colors.cB,
    },
    third: {
      main: theme.colors.cC,
    },
    fourth: {
      main: theme.colors.cD,
    },
    background: {
      default: theme.colors.bg3,
      paper: theme.colors.bg3,
      light: theme.colors.bg1,
    },
    text: {
      primary: theme.colors.cB,
      secondary: theme.colors.cC,
    },
  },
  typography: {
    fontFamily: "'Silkscreen', cursive",
  },
};

const muiTheme = createTheme(muiThemeProps);

export default responsiveFontSizes(muiTheme);
