import React from "react";
import { Text, View } from "react-native";
import TodoForm from "../components/TodoForm";

function CreateScreen() {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <View>
      <Text>Create Screen</Text>
      <TodoForm handleSubmit={handleSubmit} />
    </View>
  );
}

export default CreateScreen;
