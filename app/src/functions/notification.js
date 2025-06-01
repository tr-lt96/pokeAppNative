import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOTI_PERMISSION_KEY } from "../constants";

export const getNotiPermission = async () => {
  const settings = await Notifications.getPermissionsAsync();

  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

export const askNotiPermission = async (force = false) => {
  const hasAskedPermission = await AsyncStorage.getItem(NOTI_PERMISSION_KEY);
  if (hasAskedPermission && !force) {
    return;
  }

  AsyncStorage.setItem(NOTI_PERMISSION_KEY, "true");

  return Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });
};

export const sendInAppNoti = (message = "", interval = 0) => {
  return Notifications.scheduleNotificationAsync({
    content: {
      body: message,
    },
    trigger: !interval
      ? null
      : {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: interval,
        },
  });
};
