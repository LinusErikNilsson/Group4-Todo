import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

export default function MapScreen({ navigation, route }: Props) {
  const [permission, setPermission] = useState(false);
  const { todoItems } = useTodo();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();
  const [loadingGetLocation, setLoadingGetLocation] = useState(false);

  const getLocation = async (coordinates: LatLng) => {
    const { latitude, longitude } = coordinates;
    setLoadingGetLocation(true);
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    setLoadingGetLocation(false);

    if (location.length > 0) {
      const { name, street, region, postalCode } = location[0];

      const locationString = `${street || "unknown"} ${name || ""}, ${
        region || ""
      }, ${postalCode || ""}`;

      return {
        coordinates,
        location: locationString,
      };
    }

    return {
      coordinates,
      location: "Unknown",
    };
  };

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setPermission(true);
      }
    };
    getPermission();
  }, []);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const phoneLocation = await Location.getCurrentPositionAsync();
      if (phoneLocation) {
        setCurrentLocation(phoneLocation);
      }
    };
    getCurrentLocation();
  }, []);

  if (
    !permission &&
    (route.params.returnPath === "Edit" || route.params.returnPath === "Create")
  ) {
    return (
      <View style={styles.container}>
        <Text>Permission not granted</Text>
        <Text>Please edit Location Permissions to use this feature</Text>
      </View>
    );
  }

  if (!currentLocation) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (loadingGetLocation) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button loading>Loading</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onDoublePress={async (e) => {
          if (route.params.returnPath !== "Home") {
            navigation.navigate(
              route.params.returnPath === "Edit" ? "Edit" : "Create",
              {
                location: await getLocation(e.nativeEvent.coordinate),
              }
            );
          }
        }}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {todoItems.map((todo) =>
          todo.coordinates ? (
            <Marker
              key={todo.id}
              coordinate={todo.coordinates}
              title={todo.title}
              description={todo.description}
            />
          ) : null
        )}
      </MapView>
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
