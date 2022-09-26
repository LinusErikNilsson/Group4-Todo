import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number; path?: string };
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <NativeStack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
