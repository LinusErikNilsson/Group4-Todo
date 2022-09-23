import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Router } from "express";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

export default function MapScreen({ navigation, route } : Props) {
  return (
    <View style={styles.container}>
      <Text> Map Screen 🗺️</Text>
      <StatusBar style="auto" />
      <Button title="Gå tillbaka" onPress={() => navigation.goBack()} />
      <Button title="Gå hem" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
