import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/components/shared/core";
import { AppRouter } from "./AppRouter";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
      <StatusBar />
    </ThemeProvider>
  );
}
