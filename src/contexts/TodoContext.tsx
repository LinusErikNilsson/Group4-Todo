import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "../utils/mockdata";
import { Todo } from "../utils/types";

interface ContextValue {
  todoItems: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

const TodoContext = createContext<ContextValue>({
  todoItems: [],
  addTodo: () => {
    console.warn("TodoProvider not found");
  },
  removeTodo: () => {
    console.warn("TodoProvider not found");
  },
  updateTodo: () => {
    console.warn("TodoProvider not found");
  },
});

interface Props {
  children: ReactNode;
}

function TodoProvider({ children }: Props) {
  const [todoItems, setTodoItems] = useState<Todo[]>(data);

  useEffect(() => {
    const readItemFromStorage = async () => {
      const result = await AsyncStorage.getItem("TodoItems");
      if (result) {
        setTodoItems(
          JSON.parse(result, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

            if (typeof value === "string" && dateFormat.test(value)) {
              return new Date(value);
            }
            return value;
          })
        );
      }
    };
    readItemFromStorage();
  }, []);

  useEffect(() => {
    const writeItemToStorage = async (newValue: Todo[]) => {
      await AsyncStorage.setItem("TodoItems", JSON.stringify(newValue));
    };
    writeItemToStorage(todoItems);
  }, [todoItems]);

  const addTodo = (todo: Todo) => {
    const newTodoItems = [...todoItems];
    newTodoItems.push(todo);
    setTodoItems(newTodoItems);
  };

  const removeTodo = (id: number) => {
    const newTodoItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(newTodoItems);
  };

  const updateTodo = (todo: Todo) => {
    setTodoItems((prevState) =>
      prevState.map((t) => (t.id === todo.id ? todo : t))
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todoItems,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);

export default TodoProvider;
