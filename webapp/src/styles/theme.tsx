import { createTheme } from "@mui/material/styles";

declare interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: PaletteColor;
    inputColor: PaletteColor;
  }
  interface PaletteOptions {
    tertiary: PaletteColor;
    inputColor: PaletteColor;
  }
  interface Theme {
    toRem: (px: number | string) => string;
  }
  interface ThemeOptions {
    toRem?: (px: number) => string;
  }
}

const theme = createTheme({
  palette: {
    tertiary: {
      main: "#192741",
    },
    inputColor: {
      main: "#41576B",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "DM Sans,Roboto,sans-serif",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: "DM Sans",;
        font-style: normal;
        font-display: swap;
        src: local('DM Sans'), local('DM Sans'), 
         url(https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;400;600;700) 
      }
      `,
    },
  },
});


export const colors = {
  fuschia: {
    100: '#EF5DA8',
    80: '#F178B6',
    60: '#FCDDEC',
  },
  orchid: {
    100: '#5D5FEF',
    80: '#7879F1',
    60: '#A5A6F6',
  },
  darth: {
    100: '#000F2D',
    90: '#102440',
    80: '#273954',
    70: '#3e4f68',
    60: '#57667c',
    50: '#717e91',
    40: '#8c96a6',
    30: '#a7b0bc',
    20: '#c4c9d2',
    10: '#e1e4e8',
  },
  purple: {
    100: '#4339F2'
  }
}
export const darkMode = {
  primary: {
    main: "#000F2D",
  },
  secondary: {
    main: "#6073D8",
    alternate: "#99a5e6",
  },
  tertiary: theme.palette.augmentColor({
    color: {
      main: "#192741",
    },
  }),
  inputColor: theme.palette.augmentColor({
    color: {
      main: "#41576B",
    },
  }),
  text: {
    primary: "#FFFFFF",
    secondary: "#BFBFBF",
  },
};

export const lightMode = {
  primary: {
    main: "#ffffff",
  },
  secondary: {
    main: "#111111",
  },
  tertiary: theme.palette.augmentColor({
    color: {
      main: "#ffffff",
    },
  }),
  inputColor: theme.palette.augmentColor({
    color: {
      main: "#ffffff",
    },
  }),
  text: {
    primary: "#111111",
    secondary: "#BFBFBF",
  },
};

theme.toRem = (px: number | string) =>
  `${Math.floor((parseInt(px.toString()) || 0) / 16)}rem`;

theme.typography.body2 = {
  ...theme.typography.body2,
  color: theme.palette.text.primary,
};

theme.typography.h1 = {
  fontSize: "4rem",
  fontWeight: "400",
  lineHeight: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
    lineHeight: "3.5rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
};

export default theme;
