import { createContext, useContext } from "react";
import theme from "../../../../config/theme";

const ThemeContext = createContext({
  theme: theme,
});

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
