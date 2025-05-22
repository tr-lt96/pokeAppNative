import { StatusBar } from "expo-status-bar";
import { ThemeProvider, MessageProvider } from "./src/components/shared/core";
import { AppRouter } from "./AppRouter";
import { UserProvider } from "./src/components/auth/context/AuthContext";

export default function App() {
  return (
    <ThemeProvider>
      <MessageProvider>
        <UserProvider>
          <AppRouter />
          <StatusBar />
        </UserProvider>
      </MessageProvider>
    </ThemeProvider>
  );
}
