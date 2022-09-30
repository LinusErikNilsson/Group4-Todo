import * as Notifications from "expo-notifications";

export async function notificationsSetup() {
  const { status } = await Notifications.requestPermissionsAsync({
    android: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });

  if (status !== "granted") {
    return;
  }

  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

export async function schedulePushNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}
