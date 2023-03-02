import { ITask } from "../../interface";

export type ModalWindowProps = {
  selectedItem: ITask;
  handleCloseWindow: () => void;
  handleUpdateTask: (taskId: number, status: boolean) => void;
};
