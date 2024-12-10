import React from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { darkMode, lightMode } from "@/styles/theme";
import { deepmerge } from "@mui/utils";
import theme from "@/styles/theme";
const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light",
});
import CssBaseline from "@mui/material/CssBaseline";

interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

const ColorModeProvider = ({ children }: Props) => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode: mode,
    }),
    [mode]
  );

  const updateTheme = React.useMemo(
    () =>
      createTheme(theme, {
        palette: {
          mode,
          ...(mode === "light" ? lightMode : darkMode),
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={updateTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;

export const useColor = () => React.useContext(ColorModeContext);
