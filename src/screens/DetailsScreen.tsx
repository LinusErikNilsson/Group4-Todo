import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useTodo } from "../contexts/TodoContext";
import HourMinutesFormater from "../utils/dateformatting";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props) {
  const { todoItems, updateTodo, removeTodo } = useTodo();
  const todoData = todoItems.find((t) => t.id === route.params.id);
  useEffect(() => {
    navigation.setOptions({
      title: todoData?.title,
    });
  }, [navigation, todoData?.title]);

  if (todoData) {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate("Edit", {
                id: todoData.id,
              })
            }
            icon="pencil"
          >
            Edit
          </Button>
          <Button
            onPress={() => {
              return Alert.alert(
                "Remove",
                "Are you sure you want to remove this todo?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      removeTodo(todoData.id);
                      navigation.goBack();
                    },
                  },
                  {
                    text: "No",
                  },
                ]
              );
            }}
            icon="delete"
          >
            Delete
          </Button>
        </View>
        <View style={styles.container}>
          <View style={styles.containerItemColumnAlignCenter}>
            {todoData.imageUri ? (
              <Image
                source={{ uri: todoData.imageUri }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 999,
                }}
              />
            ) : (
              <View />
            )}
            <Text
              variant="headlineLarge"
              style={{
                margin: 10,
              }}
            >
              {todoData.title}
            </Text>
          </View>
          <View style={styles.containerItemRow}>
            <Button
              mode="contained"
              icon={todoData.status === "Completed" ? "check" : "alert-circle"}
              buttonColor={todoData.status === "Completed" ? "green" : "red"}
              onPress={() => {
                todoData.status =
                  todoData.status === "Completed" ? "Pending" : "Completed";
                updateTodo(todoData);
              }}
              style={{ width: "48%" }}
            >
              {todoData.status}
            </Button>
            <Button
              mode="contained"
              style={{ width: "48%" }}
              buttonColor={
                todoData.priority === "High"
                  ? "red"
                  : todoData.priority === "Medium"
                  ? "orange"
                  : "green"
              }
              onPress={() => {
                if (todoData.priority === "High") {
                  todoData.priority = "Medium";
                } else if (todoData.priority === "Medium") {
                  todoData.priority = "Low";
                } else {
                  todoData.priority = "High";
                }
                updateTodo(todoData);
              }}
            >
              Priority: {todoData.priority}
            </Button>
          </View>
          <View style={styles.containerItemColumn}>
            <Text variant="bodyMedium" style={styles.boldText}>
              Description
            </Text>
            <Text variant="bodyLarge">{todoData.description} </Text>
          </View>
          <View style={styles.containerItemColumn}>
            <Text variant="bodyMedium" style={styles.boldText}>
              Dates and times
            </Text>
            <Text variant="bodyLarge">
              Due date: {HourMinutesFormater(todoData.dueDate)}{" "}
              {todoData.dueDate.toDateString()}
            </Text>
            {todoData.alertTime ? (
              <Text variant="bodyLarge">
                Alert date: {HourMinutesFormater(todoData.alertTime)}{" "}
                {todoData.alertTime.toDateString()}
              </Text>
            ) : (
              <Text variant="bodyLarge">No alert time set.</Text>
            )}
          </View>
          {todoData.location ? (
            <View style={styles.containerItemColumn}>
              <Text variant="bodyMedium" style={styles.boldText}>
                Location
              </Text>
              <Text variant="bodyLarge">Adress: {todoData.location}</Text>
              {todoData.alertOnLocation ? (
                <Text variant="bodyLarge">Will alert on location</Text>
              ) : (
                <Text variant="bodyLarge">Will not alert on location</Text>
              )}
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    );
  }
  return (
    <View>
      <Text> 404</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
  },
  containerItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerItemColumn: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  containerItemColumnAlignCenter: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonStyling: {
    margin: 10,
  },
});
