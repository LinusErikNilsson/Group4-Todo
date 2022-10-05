import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TodoPreview from "../components/TodoPreview";
import { useTodo } from "../contexts/TodoContext";
import { TabScreenProps } from "../navigation/TabNavigator";

type Props = TabScreenProps<"HistoryTab">;

export default function HistoryScreen({ navigation }: Props) {
  const todos = useTodo();

  return (
    <ScrollView>
      <View style={styles.container}>
        {todos.todoItems
          .filter((todo) => todo.status === "Completed")
          .sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime())
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    padding: 10,
    paddingBottom: 20,
  },
});
