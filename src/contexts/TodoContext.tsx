import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
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
      const result = await SecureStore.getItemAsync("TodoItems");
      if (result) {
        setTodoItems(JSON.parse(result));
      }
    };
    readItemFromStorage();
  }, []);

  useEffect(() => {
    const writeItemToStorage = async (newValue: Todo[]) => {
      await SecureStore.setItemAsync("TodoItems", JSON.stringify(newValue));
    };
    writeItemToStorage(todoItems);
  }, [todoItems]);

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