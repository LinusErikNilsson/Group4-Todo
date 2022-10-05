import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";
import { LocationInfo } from "../utils/types";
import TabNavigator, { TabParamList } from "./TabNavigator";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<TabParamList>;
  Home: undefined;
  Create: { location?: LocationInfo; picture?: string };
  Edit: { location?: LocationInfo; picture?: string; id?: number };
  Details: { id: number };
  History: undefined;
  Map: { returnPath: string };
  Camera: { returnPath: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
