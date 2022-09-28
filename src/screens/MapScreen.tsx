import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng } from "react-native-maps";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

export default function MapScreen({ navigation, route }: Props) {
  const getLocation = async (coordinates: LatLng) => {
    const { latitude, longitude } = coordinates;
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    return {
      coordinates,
      location: location[0].street ? location[0].street : "Unknown",
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onDoublePress={async (e) => {
          navigation.navigate(
            route.params.returnPath === "Edit" ? "Edit" : "Create",
            {
              location: await getLocation(e.nativeEvent.coordinate),
            }
          );
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
