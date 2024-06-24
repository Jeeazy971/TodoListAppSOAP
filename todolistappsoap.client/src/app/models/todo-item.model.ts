import { User } from "./user.model";

export interface ToDoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  userId: number;
  user?: User;
}

export { User };
