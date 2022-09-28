import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CameraScreen from "./screens/CameraScreen";
import CreateScreen from "./screens/CreateScreen";
import DetailsScreen from "./screens/DetailsScreen";
import EditScreen from "./screens/EditScreen";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { LocationInfo } from "./utils/types";

export type RootStackParamList = {
  Home: undefined;
  Create: { location?: LocationInfo; picture?: string };
  Edit: { location?: LocationInfo; picture?: string; id?: number };
  Details: { id: number };
  History: undefined;
  Map: { returnPath: string };
  Camera: { returnPath: string };
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
        <NativeStack.Screen
          name="Create"
          component={CreateScreen}
          options={{ title: "Create" }}
        />
        <NativeStack.Screen
          name="Edit"
          component={EditScreen}
          options={{ title: "Edit" }}
        />
        <NativeStack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "History" }}
        />
        <NativeStack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Map" }}
        />
        <NativeStack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: "Camera" }}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
