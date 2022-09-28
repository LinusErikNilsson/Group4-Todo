/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import * as Location from "expo-location";
import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import TodoProvider from "./contexts/TodoContext";
import { requestPermissions } from "./tasks/TodoLocationTask";

function Main() {
  Location.requestForegroundPermissionsAsync();
  Location.requestBackgroundPermissionsAsync();
  requestPermissions();

  if (!Location.hasStartedLocationUpdatesAsync("background-location-task")) {
    Location.startLocationUpdatesAsync("background-location-task", {
      accuracy: Location.Accuracy.Balanced,
    });
  }

  return (
    <PaperProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </PaperProvider>
  );
}

registerRootComponent(Main);
