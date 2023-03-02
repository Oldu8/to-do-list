export interface IFormData {
  [key: string]: string | undefined;
}

export interface ITask {
  id: number;
  taskTitle: string;
  taskDescription: string;
  status: boolean;
}

export type TaskItemProps = {
  task: ITask;
  handleItemClick: (id: number) => void;
  handleUpdateTask: (taskId: number, status: boolean) => void;
};

export type ModalWindowProps = {
  selectedItem: ITask;
  handleCloseWindow: () => void;
  handleUpdateTask: (taskId: number, status: boolean) => void;
};

export type ErrorKeys = "taskTitle" | "taskDescription";

export type IErrors = {
  [key in ErrorKeys]: string | undefined;
};

export type InputSectionProps = {
  name: ErrorKeys;
  title: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: IFormData;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors: IErrors;
};
