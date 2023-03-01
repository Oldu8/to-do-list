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
