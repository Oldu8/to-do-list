import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/interfaces";
import { ModalWindowProps } from "./types";
import { removeTodo, statusToggleTodo } from "../../redux/todosSlice";

function ModalWindow(props: ModalWindowProps) {
  const { taskId, handleCloseWindow } = props;

  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.todos.find((todo) => todo.id === taskId)
  );

  const handleStatusChange = () => dispatch(statusToggleTodo(taskId));

  const handleRemoveItem = () => {
    dispatch(removeTodo(taskId));
    handleCloseWindow();
  };

  return (
    <section className="modalWrapper active" onClick={handleCloseWindow}>
      {!task ? (
        <div className="modalError">
          <p>Task not found</p>
          <button className="modalButton" onClick={handleCloseWindow}>
            Close
          </button>
        </div>
      ) : (
        <div
          className="modalWindow active"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="modalTitle">{task.taskTitle}</h3>
          <p>Description:</p>
          <p className="modalDesc">{task.taskDescription}</p>
          <div className="modalStatus">
            Status:
            <input
              className="modalInput"
              type="checkbox"
              id="isDone"
              name="isDone"
              checked={task.status}
              onChange={handleStatusChange}
            />
          </div>
          <div className="buttonsBlock">
            <button className="modalButton" onClick={handleCloseWindow}>
              Close
            </button>
            <button className="modalButton" onClick={handleRemoveItem}>
              Delete
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ModalWindow;
