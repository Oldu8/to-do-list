export interface ITask {
  id: number;
  taskTitle: string;
  taskDescription: string;
  status: boolean;
}

export type TaskItemProps = {
  task: ITask;
};
