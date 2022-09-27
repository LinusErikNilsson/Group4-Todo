import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen 🏠</Text>
      <StatusBar style="auto" />
      <Button
        title="DetailsScreen"
        onPress={() => navigation.navigate("Details", { id: 2, path: "/" })}
      />
      <Button
        title="CreateScreen"
        onPress={() => navigation.navigate("Create")}
      />
      <Button title="EditScreen" onPress={() => navigation.navigate("Edit")} />
      <Button
        title="HistoryScreen"
        onPress={() => navigation.navigate("History")}
      />
      <Button title="MapScreen" onPress={() => navigation.navigate("Map")} />
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
});
