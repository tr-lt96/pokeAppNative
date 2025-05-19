import { Image as NativeImage } from "react-native";
import { resolveStyleProps } from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";

export const Image = ({ uriSrc, staticSrc, style, ...imageProps }) => {
  const { theme } = useTheme();

  const resolvedStyle = resolveStyleProps(imageProps, theme);

  if (uriSrc) {
    return (
      <NativeImage
        source={{ uri: uriSrc }}
        style={{
          width: "100%",
          height: "100%",
          ...resolvedStyle,
          ...style,
        }}
      />
    );
  }

  if (staticSrc) {
    return (
      <NativeImage source={staticSrc} style={{ ...resolvedStyle, ...style }} />
    );
  }

  return null;
};
