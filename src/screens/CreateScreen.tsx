import React from "react";
import { View } from "react-native";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../contexts/TodoContext";
import { TabScreenProps } from "../navigation/TabNavigator";
import { TodoFormValues } from "../utils/types";

type Props = TabScreenProps<"CreateTab">;

function CreateScreen({ navigation, route }: Props) {
  const { addTodo } = useTodo();

  const handleSubmit = (values: TodoFormValues) => {
    addTodo({
      ...values,
      id: Math.floor(Math.random() * 1000),
    });
    navigation.navigate("Home");
  };

  return (
    <View>
      <TodoForm
        onSubmit={handleSubmit}
        location={route.params.location}
        picture={route.params.picture}
        returnPath="Create"
      />
    </View>
  );
}

export default CreateScreen;
