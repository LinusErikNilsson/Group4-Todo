import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import LocationTracking from "./components/LocationTracking";
import TodoProvider from "./contexts/TodoContext";
import { notificationsSetup } from "./utils/notifications";

function Main() {
  notificationsSetup();

  return (
    <PaperProvider>
      <TodoProvider>
        <LocationTracking />
        <App />
      </TodoProvider>
    </PaperProvider>
  );
}

registerRootComponent(Main);
