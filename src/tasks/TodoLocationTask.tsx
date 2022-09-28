import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as TaskManager from "expo-task-manager";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LatLng } from "react-native-maps";
import { Todo } from "../utils/types";

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === "granted") {
    console.log("Background location permission granted");
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
    });
    console.log("Location tracking enabled");
  }
};

function haversine(coords1: LatLng, coords2: LatLng) {
  let lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  let lat2 = coords2.latitude;
  const lon2 = coords2.longitude;
  // distance between latitudes
  // and longitudes
  const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  const dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radiansa
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const rad = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
}

function PermissionsButton() {
  return (
    <TouchableOpacity onPress={requestPermissions}>
      <Text>Enable background location</Text>
    </TouchableOpacity>
  );
}

const readItemsFromStorage = async () => {
  const result = await SecureStore.getItemAsync("TodoItems");
  if (result) {
    const data: Todo[] = await JSON.parse(result);
    return data;
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  const todoItems = await readItemsFromStorage();
  const dataobj = data as Location.LocationTaskServiceOptions;

  if (error) {
    return;
  }

  if (todoItems) {
    const todosWithAlertOnLocation = todoItems.filter((t) => t.alertOnLocation);
    todosWithAlertOnLocation.forEach((t) => {
      if (t.coordinates) {
        const distance = haversine(t.coordinates, {
          latitude: dataobj.locations[0].coords.latitude,
          longitude: dataobj.locations[0].coords.longitude,
        });

        if (distance < 0.03) {
          console.log("You are near " + t.title);
        }
      }
    });
  }
});

export { requestPermissions, PermissionsButton, haversine };
