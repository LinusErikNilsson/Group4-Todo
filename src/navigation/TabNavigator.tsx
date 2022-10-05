import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import CreateScreen from "../screens/CreateScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MapScreen from "../screens/MapScreen";
import { LocationInfo } from "../utils/types";
import HomeStackNavigator, { HomeStackParamList } from "./HomeStackNavigator";
import { RootStackParamList } from "./RootStackNavigator";

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CreateTab: { location?: LocationInfo; picture?: string };
  HistoryTab: undefined;
  MapTab: { returnPath: string };
};

/** Use this to easily define screen props */
export type TabScreenProps<Screen extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreateScreen}
        initialParams={{ location: undefined, picture: undefined }}
        options={{
          title: "Create",
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapScreen}
        initialParams={{ returnPath: "Home" }}
        options={{
          title: "Map",
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryScreen}
        options={{
          title: "History",
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
