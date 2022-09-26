import React from "react";
import { TextInput, View } from "react-native";
import { Todo } from "../utils/types";

interface Props {
  handleSubmit: (values: Todo) => void;
}

function TodoForm({ handleSubmit }: Props) {
  return (
    <View>
      <TextInput placeholder="Add a todo" />
    </View>
  );
}

export default TodoForm;
