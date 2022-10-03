import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import TodoPreview from "../components/TodoPreview";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const todos = useTodo();

  return (
    <ScrollView>
      <View>
        <Text variant="headlineSmall"> Overdue:</Text>
      </View>
      <View style={styles.container}>
        {todos.todoItems
          .filter(
            (todo) => todo.dueDate < new Date() && todo.status === "Pending"
          )
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
          .map((todo, idx, arr) => (
            <TodoPreview
              key={todo.id}
              todo={todo}
              bottomDivider={idx !== arr.length - 1}
              navToDetails={() =>
                navigation.navigate("Details", { id: todo.id })
              }
            />
          ))}
      </View>
      <View>
        <Text variant="headlineSmall">Upcoming:</Text>
      </View>
      <View style={styles.container}>
        {todos.todoItems
          .filter(
            (todo) => todo.dueDate > new Date() && todo.status === "Pending"
          )
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
          .map((todo, idx, arr) => (
            <TodoPreview
              key={todo.id}
              todo={todo}
              bottomDivider={idx !== arr.length - 1}
              navToDetails={() =>
                navigation.navigate("Details", { id: todo.id })
              }
            />
          ))}
      </View>
      <StatusBar style="auto" />
      <Button
        title="DetailsScreen"
        onPress={() => navigation.navigate("Details", { id: 4 })}
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
    </ScrollView>
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
