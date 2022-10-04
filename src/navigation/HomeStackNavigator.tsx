import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import { LocationInfo } from "../utils/types";
import { TabScreenProps } from "./TabNavigator";
import Home from "../screens/HomeScreen";
import Details from "../screens/DetailsScreen";

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
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Info")}>
              <MaterialIcons name="info-outline" size={24} color="black" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
