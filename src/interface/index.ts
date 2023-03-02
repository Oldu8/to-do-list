export interface IFormData {
  [key: string]: string;
}

export interface ITask {
  id: number;
  taskTitle: string;
  taskDescription: string;
  status: boolean;
}

export type ErrorKeys = "taskTitle" | "taskDescription";

export type IErrors = {
  [key in ErrorKeys]: string | undefined;
};
