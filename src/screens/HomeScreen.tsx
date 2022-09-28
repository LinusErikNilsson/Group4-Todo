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
        onPress={() => navigation.navigate("Details", { id: 84, path: "/" })}
      />
      <Button
        title="CreateScreen"
        onPress={() =>
          navigation.navigate("Create", {
            location: undefined,
            picture: undefined,
          })
        }
      />
      <Button
        title="EditScreen"
        onPress={() =>
          navigation.navigate("Edit", {
            location: undefined,
            picture: undefined,
          })
        }
      />
      <Button
        title="HistoryScreen"
        onPress={() => navigation.navigate("History")}
      />
      <Button
        title="MapScreen"
        // eslint-disable-next-line no-console
        onPress={() => navigation.navigate("Map")}
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
});
