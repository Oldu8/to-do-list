import { ITask } from "../../interface";

export type TaskItemProps = {
  task: ITask;
  handleItemClick: (id: number) => void;
};
