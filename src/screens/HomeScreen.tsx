import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import TodoPreview from "../components/TodoPreview";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const todos = useTodo();

  return (
    <ScrollView>
      <View style={styles.container}>
        {todos.todoItems.map((todo, idx, arr) => (
          <View
            key={todo.id}
            style={{
              width: "100%",
              padding: 5,
            }}
          >
            <TodoPreview
              todo={todo}
              bottomDivider={idx !== arr.length - 1}
              navToDetails={() =>
                navigation.navigate("Details", { id: todo.id })
              }
            />

            {/* <Button
              title="Edit"
              onPress={() => navigation.navigate("Edit", { id: todo.id })}
            /> */}
          </View>
        ))}
        <Text>Home Screen 🏠</Text>
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
      </View>
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
