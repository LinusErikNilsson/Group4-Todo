import React from "react";
import { Text, View } from "react-native";
import TodoForm from "../components/TodoForm";

function EditScreen() {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <View>
      <Text>Edit Screen</Text>
      <TodoForm onSubmit={handleSubmit} />
    </View>
  );
}

export default EditScreen;
