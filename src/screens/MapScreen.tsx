import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng } from "react-native-maps";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

export default function MapScreen({ navigation }: Props) {
  const getLocation = async (coordinates: LatLng) => {
    const { latitude, longitude } = coordinates;
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    return {
      coordinates,
      location,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onDoublePress={async (e) => {
          navigation.navigate("Create", {
            location: await getLocation(e.nativeEvent.coordinate),
          });
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
