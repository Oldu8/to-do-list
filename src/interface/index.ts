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

export interface IErrors {
  [key: string]: string | undefined;
}

export type InputSectionProps = {
  name: string;
  title: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: IFormData;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors: IErrors;
};
