import { LatLng } from "react-native-maps";

interface LocationInfo {
  coordinates: LatLng;
  location?: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  coordinates?: LatLng;
  location?: string;
  alertTime?: Date;
  dueDate: Date;
  alertOnLocation?: boolean;
  imageUri?: string;
  status: "Pending" | "Completed";
  priority: "Low" | "Medium" | "High";
}

type TodoFormValues = Omit<Todo, "id">;

export type { Todo, TodoFormValues, LocationInfo };
