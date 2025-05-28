import React from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { Flex } from "../layouts/Flex";
import { MaterialIcons } from "@expo/vector-icons";

export const Rating = ({
  count = 5,
  value,
  emptySymbol,
  fullSymbol,
  keyID = "",
  ...ratingProps
}) => {
  const { theme } = useTheme();
  const emptySlots = Array.from({
    length: Math.min(Math.max(count - value, 0), count),
  });
  const fullSlots = Array.from({
    length: Math.min(Math.max(value, 0), count),
  });

  return (
    <Flex gap={2} {...ratingProps}>
      {fullSlots.map((_slot, index) => {
        return fullSymbol ? (
          React.cloneElement(fullSymbol, {
            key: `${keyID}-rating-full-${index}`,
          })
        ) : (
          <MaterialIcons
            key={`${keyID}-rating-full-${index}`}
            color={theme.colors.primary}
            name={"circle"}
            size={10}
          />
        );
      })}
      {emptySlots.map((_slot, index) => {
        return emptySymbol ? (
          React.cloneElement(emptySymbol, {
            key: `${keyID}-rating-empty-${index}`,
          })
        ) : (
          <MaterialIcons
            key={`${keyID}-rating-empty-${index}`}
            color={theme.colors.primary}
            name={"radio-button-unchecked"}
            size={10}
          />
        );
      })}
    </Flex>
  );
};

{
  /* <Rating
        count={6}
        emptySymbol={<IconCircleFilled color={emptyColor} size={10} />}
        fullSymbol={<IconCircleFilled color={ratingColor} size={10} />}
        value={chartValue}
        readOnly
      /> */
}
