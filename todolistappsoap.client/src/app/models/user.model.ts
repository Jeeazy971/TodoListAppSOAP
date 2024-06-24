import { ToDoItem } from "./todo-item.model";

export interface User {
  id: number;
  name: string;
  toDoItems?: ToDoItem[];
}
