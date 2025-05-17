import { DEFAULT_COLORS } from "./color";
import { DEFAULT_RADIUS } from "./radius";
import { getThemeSpacing } from "./spacing";
import { TYPOGRAPHY_VARIANT } from "./typography";

const theme = {
  colors: DEFAULT_COLORS,
  typography: TYPOGRAPHY_VARIANT,
  spacing: getThemeSpacing,
  radius: DEFAULT_RADIUS,
};

export default theme;
