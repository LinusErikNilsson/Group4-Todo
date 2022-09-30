import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const todos = useTodo();

  return (
    <View style={styles.container}>
      {todos.todoItems.map((todo) => (
        <View key={todo.id}>
          <Text key={todo.id}>{todo.title}</Text>
          {todo.imageUri && (
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: todo.imageUri }}
            />
          )}
          <Button
            title="Edit"
            onPress={() => navigation.navigate("Edit", { id: todo.id })}
          />
        </View>
      ))}
      <Text>Home Screen 🏠</Text>
      <StatusBar style="auto" />
      <Button
        title="DetailsScreen"
        onPress={() => navigation.navigate("Details", { id: 4 })}
      />
      <Button
        title="Map"
        onPress={() => navigation.navigate("Map", { returnPath: "Home" })}
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
        title="HistoryScreen"
        onPress={() => navigation.navigate("History")}
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
