import React, { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { truncateString } from "../../functions/functions";
import { statusToggleTodo } from "../../redux/todosSlice";
import { TaskItemProps } from "./types";

export default function TaskItem(props: TaskItemProps) {
  const { id, taskTitle, taskDescription, status } = props.task;
  const { handleItemClick } = props;

  // const handleItemClick = (id: number) => console.log("fucking func", id);
  useEffect(() => {
    console.log("Did mount: ", id);
  }, []);
  // componentDidUpdate
  useEffect(() => {
    console.log("Did updated: ", id);
  }, [props]);
  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("Did unmount: ", id);
    };
  }, []);

  const title = truncateString(taskTitle);
  const desc = truncateString(taskDescription);

  const dispatch = useDispatch();
  const handleStatusChange = useCallback(
    () => dispatch(statusToggleTodo(id)),
    [dispatch, id]
  );

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

export const MemoizedTaskItem = React.memo(TaskItem);
