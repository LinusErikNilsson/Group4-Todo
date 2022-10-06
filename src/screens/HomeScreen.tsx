import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, FAB, Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import TodoPreview from "../components/TodoPreview";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const todos = useTodo();

  const overDue = todos.todoItems
    .filter((todo) => todo.dueDate < new Date() && todo.status === "Pending")
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .map((todo, idx, arr) => (
      <TodoPreview
        key={todo.id}
        todo={todo}
        bottomDivider={idx !== arr.length - 1}
        navToDetails={() => navigation.navigate("Details", { id: todo.id })}
      />
    ));

  const today = todos.todoItems
    .filter(
      (todo) =>
        todo.dueDate.getDate() === new Date().getDate() &&
        todo.dueDate.getMonth() === new Date().getMonth() &&
        todo.dueDate.getFullYear() === new Date().getFullYear() &&
        todo.status === "Pending" &&
        todo.dueDate > new Date()
    )
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .map((todo, idx, arr) => (
      <TodoPreview
        key={todo.id}
        todo={todo}
        bottomDivider={idx !== arr.length - 1}
        navToDetails={() => navigation.navigate("Details", { id: todo.id })}
      />
    ));

  const upcoming = todos.todoItems
    .filter(
      (todo) =>
        todo.dueDate.getDate() > new Date().getDate() &&
        todo.dueDate.getMonth() >= new Date().getMonth() &&
        todo.dueDate.getFullYear() >= new Date().getFullYear() &&
        todo.status === "Pending"
    )
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .map((todo, idx, arr) => (
      <TodoPreview
        key={todo.id}
        todo={todo}
        bottomDivider={idx !== arr.length - 1}
        navToDetails={() => navigation.navigate("Details", { id: todo.id })}
      />
    ));

  if (!overDue && !today && !upcoming) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>No todos to show</Text>
        <Button
          onPress={() =>
            navigation.navigate("Create", {
              location: undefined,
              picture: undefined,
            })
          }
        >
          Add Todo
        </Button>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#fff",
          }}
        >
          <Button
            onPress={() => navigation.navigate("History")}
            mode="outlined"
            style={{ flex: 1, marginEnd: 10 }}
          >
            Todo History
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("Map", {
                returnPath: "Home",
              })
            }
            mode="outlined"
            style={{ flex: 1, marginStart: 10 }}
          >
            Todo Locations
          </Button>
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            {overDue.length === 0 ? null : (
              <View>
                <Text style={styles.headerText}>Overdue</Text>
                {overDue}
              </View>
            )}
          </View>
          <View style={styles.section}>
            {today.length === 0 ? null : (
              <View>
                <Text style={styles.headerText}>Today</Text>
                {today}
              </View>
            )}
          </View>
          <View style={styles.section}>
            {upcoming.length === 0 ? null : (
              <View>
                <Text style={styles.headerText}>Upcomning</Text>
                {upcoming}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() =>
          navigation.navigate("Create", {
            location: undefined,
            picture: undefined,
          })
        }
        icon="plus"
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
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    marginTop: 5,
  },
  section: {
    width: "100%",
  },
});
