import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../App";
import TodoForm from "../components/TodoForm";

type Props = NativeStackScreenProps<RootStackParamList, "Create">;

function CreateScreen({ navigation, route }: Props) {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <View>
      <Text>Create Screen</Text>
      <TodoForm
        onSubmit={handleSubmit}
        location={route.params.location}
        picture={route.params.picture}
      />
    </View>
  );
}

export default CreateScreen;
