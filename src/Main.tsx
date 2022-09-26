import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import TodoProvider from "./contexts/TodoContext";
import App from "./App";

function Main() {
  return (
    <PaperProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </PaperProvider>
  );
}

registerRootComponent(Main);
