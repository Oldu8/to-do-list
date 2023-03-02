import { ITask } from "../interface";

export interface RootState {
  todos: ITask[];
  counter: number;
}
