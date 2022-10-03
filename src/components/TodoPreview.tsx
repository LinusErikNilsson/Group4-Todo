import React from "react";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { Chip, Divider, Text } from "react-native-paper";
import { useTodo } from "../contexts/TodoContext";
import { Todo } from "../utils/types";

interface Props {
  todo: Todo;
  bottomDivider?: boolean;
  navToDetails: () => void;
}

function TodoPreview({ todo, bottomDivider, navToDetails }: Props) {
  const { updateTodo } = useTodo();

  const toggleTodo = () => {
    Alert.alert(
      "Set Status",
      "Are you sure you want to set this todo to " +
        (todo.status === "Completed" ? "Pending" : "Completed") +
        "?",
      [
        {
          text: "Yes",
          onPress: () => {
            updateTodo({
              ...todo,
              status: todo.status === "Completed" ? "Pending" : "Completed",
            });
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const todoImg = todo.imageUri
    ? { uri: todo.imageUri }
    : require("../assets/placeholder.png");

  return (
    <Pressable onPress={navToDetails}>
      <View style={style.container}>
        <Image style={style.image} source={todoImg} />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {todo.title}
            </Text>

            <Chip
              onPress={() => toggleTodo()}
              style={{
                backgroundColor:
                  todo.status === "Completed"
                    ? "#85fc8f"
                    : todo.dueDate < new Date()
                    ? "#fc9585"
                    : "#fcfc85",
                marginLeft: "auto",
              }}
              textStyle={{
                color: "white",
              }}
              compact
            >
              <Text>
                {todo.status === "Completed"
                  ? todo.status
                  : todo.dueDate.getTime() > new Date().getTime()
                  ? todo.status
                  : "Overdue"}
              </Text>
            </Chip>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontSize: 15,
                color: "grey",
              }}
              ellipsizeMode="tail"
            >
              {todo.dueDate.toDateString()}
            </Text>

            <Text
              style={{
                color: "grey",
                overflow: "hidden",
                marginLeft: 10,
                justifyContent: "flex-end",
                textAlign: "right",
              }}
              ellipsizeMode="tail"
            >
              {todo.location ? todo.location : "No Location"}
            </Text>
          </View>
        </View>
      </View>
      {bottomDivider && (
        <Divider
          style={{
            marginTop: 10,
            marginBottom: 10,
            height: 1,
          }}
        />
      )}
    </Pressable>
  );
}

export default TodoPreview;

const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
