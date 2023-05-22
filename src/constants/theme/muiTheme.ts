import theme from 'constants/theme/theme';

declare module '@mui/material/styles' {
  export interface MuiTheme {
    palette: {
      primary: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
    typography: {
      fontFamily: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const muiTheme = {
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
    background: {
      default: theme.colors.bg3,
      paper: theme.colors.bg3,
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

export default muiTheme;
