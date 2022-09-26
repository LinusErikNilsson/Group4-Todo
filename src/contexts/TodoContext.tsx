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
  const [todoItems, setTodoItems] = useState<Todo[]>(() => {
    AsyncStorage.getItem("TodoItems").then((value) => {
      if (value) {
        return JSON.parse(value);
      }
    });

    return data;
  });

  /* const generateTodoItemId = (): number => {
    const id = Math.max(...todoItems.map((item) => item.id), 0) + 1;
    return id;
  }; */

  const addTodo = (todo: Todo) => {
    const newTodoItems = [...todoItems];
    /* Change this when we get data from formik
    const newTodoItem = {
      ...todo,
      id: generateTodoItemId(),
    }; */
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

  useEffect(() => {
    AsyncStorage.setItem("TodoItems", JSON.stringify(todoItems));
  }, [todoItems]);

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
