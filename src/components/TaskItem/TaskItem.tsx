import { TaskItemProps } from "../../interface";

export default function TaskItem(props: TaskItemProps) {
  const { id, taskTitle, taskDescription, status } = props.task;
  return (
    <ul className="item">
      <li className="itemID">{id}</li>
      <li className="itemTitle">{taskTitle}</li>
      <li className="itemDesc">{taskDescription}</li>
      <li className="itemStatus">
        <input type="checkbox" id="isDone" name="isDone" />
      </li>
    </ul>
  );
}
