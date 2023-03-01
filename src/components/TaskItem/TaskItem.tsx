import { TaskItemProps } from "../../interface";

function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength - 3) + "...";
  }
}

export default function TaskItem(props: TaskItemProps) {
  const { id, taskTitle, taskDescription, status } = props.task;
  const { handleItemClick, handleUpdateTask } = props;

  const title = truncateString(taskTitle, 20);
  const desc = truncateString(taskDescription, 20);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTask(id, event.target.checked);
  };

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
          checked={status}
          onChange={handleStatusChange}
        />
      </li>
    </div>
  );
}
