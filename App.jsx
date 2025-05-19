import { StatusBar } from "expo-status-bar";
import { ThemeProvider, MessageProvider } from "./src/components/shared/core";
import { AppRouter } from "./AppRouter";

export default function App() {
  return (
    <ThemeProvider>
      <MessageProvider>
        <AppRouter />
        <StatusBar />
      </MessageProvider>
    </ThemeProvider>
  );
}
