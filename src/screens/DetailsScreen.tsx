import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <Text> Details Screen {route.params.id} 🔧</Text>
      <StatusBar style="auto" />
      <Button
        title="Gå till detaljsidan igen"
        onPress={() =>
          navigation.push("Details", {
            id: route.params.id + 1,
            path: route.params.path + "/" + route.name,
          })
        }
      />
      <Button title="Gå tillbaka" onPress={() => navigation.goBack()} />
      <Button title="Gå hem" onPress={() => navigation.navigate("Home")} />
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
