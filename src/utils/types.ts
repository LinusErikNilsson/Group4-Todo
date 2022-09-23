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
  picture?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}

export type { Coordinates, Todo };
