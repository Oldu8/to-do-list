import { useDispatch } from "react-redux";
import { truncateString } from "../../functions/functions";
import { statusToggleTodo } from "../../redux/todosSlice";
import { TaskItemProps } from "./types";

export default function TaskItem(props: TaskItemProps) {
  const { id, taskTitle, taskDescription, status } = props.task;
  const { handleItemClick } = props;

  const title = truncateString(taskTitle);
  const desc = truncateString(taskDescription);

  const dispatch = useDispatch();
  const handleStatusChange = () => dispatch(statusToggleTodo(id));

  return (
    <div className="item" onClick={() => handleItemClick(id)}>
      <li className="itemID">{id}</li>
      <li className="itemTitle">{title}</li>
      <li className="itemDesc">{desc}</li>
      <li className="itemStatus" onClick={(event) => event.stopPropagation()}>
        <input
          type="checkbox"
          id="isDone"
          name="isDone"
          className="checkboxInput"
          checked={status}
          onChange={handleStatusChange}
        />
      </li>
    </div>
  );
}
