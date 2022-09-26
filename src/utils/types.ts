import { ImageSourcePropType } from "react-native";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  coordinates?: Coordinates;
  location?: string;
  alertTime?: Date;
  dueDate: Date;
  alertOnLocation?: boolean;
  picture: ImageSourcePropType;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}

type TodoFormValues = Omit<Todo, "id">;

export type { Coordinates, Todo, TodoFormValues };
