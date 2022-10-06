import * as Location from "expo-location";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useTodo } from "../contexts/TodoContext";
import haversine from "../utils/haversine";
import { schedulePushNotification } from "../utils/notifications";

export default function LocationTracking() {
  const todos = useTodo();

  const NotifyIfNearTodo = useCallback(async () => {
    const items = todos.todoItems;

    if (items) {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(location);
      }

      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const filteredItems = items.filter((item) => {
        if (item.coordinates && item.alertOnLocation) {
          const itemLocation = {
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
          };
          const distance = haversine(currentLocation, itemLocation);
          return distance < 0.1;
        }
        return false;
      });

      filteredItems.forEach((item) => {
        todos.updateTodo({
          ...item,
          alertOnLocation: false,
        });

        schedulePushNotification(item.title, item.description);
      });
    }
  }, [todos]);

  const notifyOnTime = useCallback(() => {
    const items = todos.todoItems;

    if (items) {
      const filteredItems = items.filter((item) => {
        if (item.alertTime && item.status === "Pending") {
          const now = new Date();
          const alertTime = new Date(item.alertTime);
          return now.getTime() > alertTime.getTime();
        }
        return false;
      });

      filteredItems.forEach((item) => {
        todos.updateTodo({
          ...item,
          alertTime: undefined,
        });

        schedulePushNotification(item.title, item.description);
      });
    }
  }, [todos]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        interval = setInterval(() => {
          NotifyIfNearTodo();
          notifyOnTime();
        }, 5000);
      }
    })();

    return () => {
      clearInterval(interval);
    };
  }, [NotifyIfNearTodo, notifyOnTime]);

  return <View />;
}
