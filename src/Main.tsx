/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";

function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

registerRootComponent(Main);
