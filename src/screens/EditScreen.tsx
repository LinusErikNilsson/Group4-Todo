import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../Navigation/RootStackNavigator";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../contexts/TodoContext";
import { TodoFormValues } from "../utils/types";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

function EditScreen({ route, navigation }: Props) {
  const [id, setId] = useState<number>();
  const { todoItems, updateTodo } = useTodo();
  const todoData = todoItems.find((t) => t.id === id);

  const handleSubmit = (values: TodoFormValues) => {
    if (id) {
      updateTodo({
        ...values,
        id,
      });
    }

    setId(undefined);
    navigation.navigate("Home");
  };

  useEffect(() => {
    if (route.params.id) {
      setId(route.params.id);
    }
  }, [route.params.id]);

  if (!todoData) {
    return (
      <View>
        <Text>404</Text>
      </View>
    );
  }

  return (
    <View>
      <TodoForm
        onSubmit={handleSubmit}
        location={route.params?.location}
        picture={route.params?.picture}
        todo={todoData}
        returnPath="Edit"
      />
    </View>
  );
}

export default EditScreen;
