import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../App";
import TodoForm from "../components/TodoForm";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

function EditScreen({ route }: Props) {
  const handleSubmit = (values: any) => {
    console.log("Submit", values);
  };

  return (
    <View>
      <Text>Edit Screen</Text>
      <TodoForm onSubmit={handleSubmit} location={route.params?.location} />
    </View>
  );
}

export default EditScreen;
