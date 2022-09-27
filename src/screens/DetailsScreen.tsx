import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text, ToggleButton } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route }: Props) {
  const { todoItems, updateTodo, removeTodo } = useTodo();
  const todoData = todoItems.find((t) => t.id === route.params.id);
  if (todoData) {
    todoData.dueDate = new Date(todoData.dueDate);
    return (
      <View style={styles.container}>
        <View style={styles.containerItem}>
          <Text variant="headlineSmall">
            {" "}
            {todoData.title} {todoData.status}
          </Text>
          <ToggleButton
            icon="check"
            onPress={() => {
              todoData.status =
                todoData.status === "completed" ? "pending" : "completed";
              updateTodo(todoData);
            }}
          />
        </View>
        <View style={styles.containerItem}>
          <Text variant="headlineSmall"> Priority: {todoData.priority} </Text>
          <Button
            mode="contained"
            icon="trash-can-outline"
            onPress={() => {
              removeTodo(todoData.id);
            }}
          >
            Remove todo
          </Button>
        </View>
        <View>
          <Text variant="headlineSmall">
            Due date: {todoData.dueDate.toDateString()}
          </Text>
        </View>
        <View style={styles.containerItem}>
          <Text variant="headlineSmall"> {todoData.description} </Text>
        </View>
        <View style={styles.containerItem}>
          <Text variant="headlineSmall"> bleh </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
