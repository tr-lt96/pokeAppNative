import { DEFAULT_COLORS } from "./color";
import { DEFAULT_RADIUS } from "./radius";
import { getThemeSpacing } from "./spacing";
import { TYPOGRAPHY_VARIANT } from "./typography";

const theme = {
  colors: {
    ...DEFAULT_COLORS,
    primary: DEFAULT_COLORS.indigo[6],
    white: "#ffffff",
    black: "#000000",
    transparent: "rgba(0, 0, 0, 0)",
  },
  typography: TYPOGRAPHY_VARIANT,
  spacing: getThemeSpacing,
  radius: DEFAULT_RADIUS,
};

export default theme;
