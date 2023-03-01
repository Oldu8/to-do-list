import React from "react";
import { ModalWindowProps } from "../../interface";

function ModalWindow(props: ModalWindowProps) {
  const { id, taskTitle, taskDescription, status } = props.selectedItem;
  const { handleCloseWindow, handleUpdateTask } = props;

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTask(id, event.target.checked);
  };

  return (
    <section className="modalWrapper active" onClick={handleCloseWindow}>
      <div className="modalWindow active" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">{taskTitle}</h3>
        <p>Description:</p>
        <p className="modalDesc">{taskDescription}</p>
        <div className="modalStatus">
          Status:
          <input
            className="modalInput"
            type="checkbox"
            id="isDone"
            name="isDone"
            checked={status}
            onChange={handleStatusChange}
          />
        </div>
        <button className="modalButton" onClick={handleCloseWindow}>
          Close
        </button>
      </div>
    </section>
  );
}

export default ModalWindow;
