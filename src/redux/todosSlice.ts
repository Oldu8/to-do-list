import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormData, ITask } from "../interface";
import { RootState } from "./interfaces";

const initialState: RootState = {
  todos: [],
  counter: 0,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<IFormData>) => {
      const newTask: ITask = {
        id: state.counter + 1,
        taskTitle: action.payload.taskTitle,
        taskDescription: action.payload.taskDescription,
        status: false,
      };
      state.todos.push(newTask);
      state.counter++;
    },
    statusToggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(
        (todo: ITask) => todo.id === action.payload
      );
      if (todo) {
        todo.status = !todo.status;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const todos = state.todos.filter(
        (todo: ITask) => todo.id !== action.payload
      );
      state.todos = todos;
    },
  },
});

export const { addTodo, statusToggleTodo, removeTodo } = todosSlice.actions;
