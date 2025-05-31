import { StatusBar } from "expo-status-bar";
import { ThemeProvider, MessageProvider } from "./src/components/shared/core";
import { AppRouter } from "./AppRouter";
import {
  UserProvider,
  useUser,
} from "./src/components/auth/context/AuthContext";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import {
  askNotiPermission,
  getNotiPermission,
} from "./src/functions/notification";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const MainAppBody = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setupUserContext, loading } = useUser();

  const onAppReady = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  useEffect(() => {
    setupUserContext().finally(() => {
      setAppIsReady(true);
    });
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View flex={1} onLayout={onAppReady}>
      <AppRouter />
      <StatusBar />
    </View>
  );
};

export default function App() {
  useEffect(() => {
    getNotiPermission().then((permission) => {
      if (!permission) {
        askNotiPermission();
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <MessageProvider>
        <UserProvider>
          <MainAppBody />
        </UserProvider>
      </MessageProvider>
    </ThemeProvider>
  );
}
