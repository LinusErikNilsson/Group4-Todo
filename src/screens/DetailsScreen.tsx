import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useTodo } from "../contexts/TodoContext";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props) {
  const { todoItems, updateTodo, removeTodo } = useTodo();
  const todoData = todoItems.find((t) => t.id === route.params.id);
  if (todoData) {
    todoData.dueDate = new Date(todoData.dueDate);
    if (todoData.alertTime) {
      todoData.alertTime = new Date(todoData.alertTime);
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerItemColumnAlignCenter}>
          <Text variant="headlineLarge">{todoData.title}</Text>
          <Text variant="bodyLarge">{todoData.priority} Priority</Text>
          {todoData.imageUri ? (
            <Image
              source={{ uri: todoData.imageUri }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={styles.containerItemColumnAlignCenter}>
          <Button
            mode="contained"
            icon={todoData.status === "completed" ? "check" : "close"}
            buttonColor={todoData.status === "completed" ? "green" : "red"}
            onPress={() => {
              todoData.status =
                todoData.status === "completed" ? "pending" : "completed";
              updateTodo(todoData);
            }}
          >
            Status: {todoData.status}
          </Button>
          <Button
            style={styles.buttonStyling}
            mode="contained"
            icon="trash-can-outline"
            buttonColor="red"
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
          >
            Remove todo
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
            Due date: {todoData.dueDate.toDateString()}
          </Text>
          {todoData.alertTime ? (
            <Text variant="bodyLarge">
              alert date: {todoData.alertTime.toDateString()}
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerItemRow: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  containerItemColumn: {
    width: "80%",
    justifyContent: "space-between",
  },
  containerItemColumnAlignCenter: {
    width: "80%",
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
