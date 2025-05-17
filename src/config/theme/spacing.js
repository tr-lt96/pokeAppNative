export function getThemeSpacing(gapMultiplier) {
  if (typeof gapMultiplier !== "number") {
    return 0;
  }

  return 4 * gapMultiplier;
}
