import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen( { navigation, route } : Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen 🏠</Text>
      <StatusBar style="auto" />
      <Button title="DetailsScreen" onPress={() => navigation.navigate("Details", {id: 84, path: "/" })} />
      <Button title="CreateScreen" onPress={() => navigation.navigate("Create")} />
      <Button title="EditScreen" onPress={() => navigation.navigate("Edit")} />
      <Button title="HistoryScreen" onPress={() => navigation.navigate("History")} />
      <Button title="MapScreen" onPress={() => navigation.navigate("Map")} />
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


