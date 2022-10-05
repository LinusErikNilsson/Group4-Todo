import { CompositeScreenProps } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { LocationInfo } from "../utils/types";
import { TabScreenProps } from "./TabNavigator";
import Details from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";

export type HomeStackParamList = {
  Home: undefined;
  Create: { location?: LocationInfo; picture?: string };
  Edit: { location?: LocationInfo; picture?: string; id?: number };
  Details: { id: number };
  History: undefined;
  Map: { returnPath: string };
  Camera: { returnPath: string };
};

export type HomeScreenProps<Screen extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, Screen>,
    TabScreenProps<"HomeTab">
  >;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
