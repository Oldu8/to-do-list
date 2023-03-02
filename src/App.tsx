import { useState, FocusEvent } from "react";
import "./App.css";
import InputSection from "./components/InputSection/InputSection";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import TaskItem from "./components/TaskItem/TaskItem";
import { IErrors, ITask } from "./interface";

const intialFormData = {
  taskTitle: "",
  taskDescription: "",
};

function App() {
  const [count, setCount] = useState<number>(1);
  const [formData, setFormData] = useState(intialFormData);
  const [tasksList, setTasksList] = useState<[] | ITask[]>([]);
  const [errors, setErrors] = useState<IErrors>(intialFormData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.taskDescription && !formData.taskTitle) {
      return setErrors({
        ["taskTitle"]: "Title field is empty",
        ["taskDescription"]: "Description field is empty",
      });
    }
    if (!formData.taskTitle) {
      return setErrors((ers) => {
        return {
          ...ers,
          ["taskTitle"]: "Title field is empty",
        };
      });
    }
    if (!formData.taskDescription) {
      return setErrors((ers) => {
        return {
          ...ers,
          ["taskDescription"]: "Description field is empty",
        };
      });
    }

    const newTask = {
      ...formData,
      id: count,
      status: false,
    };
    setTasksList((state) => {
      return [...state, newTask];
    });
    setCount((state) => state + 1);
    setFormData(intialFormData);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isEmpty = !!value.trim().length;
    if (!isEmpty) {
      setErrors((state) => {
        return { ...state, [name]: `${name} is empty` };
      });
    }
  };
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setErrors((ers) => {
      return { ...ers, [name]: "" };
    });
  };

  const handleItemClick = (id: number) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const handleCloseWindow = () => {
    setShowModal(false);
  };

  const handleUpdateTask = (taskId: number, status: boolean) => {
    const updTasks = tasksList.map((task: ITask) => {
      if (task.id === taskId) {
        return {
          ...task,
          status,
        };
      } else {
        return task;
      }
    });
    setTasksList(updTasks);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h2 className="title">To do list</h2>
        <form className="inputsBlock" onSubmit={onSubmit}>
          <InputSection
            title="Title"
            name="taskTitle"
            handleChange={handleChange}
            formData={formData}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            errors={errors}
          />
          <InputSection
            title="Description"
            name="taskDescription"
            handleChange={handleChange}
            formData={formData}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            errors={errors}
          />
          <input type="submit" className="submitButton" value="Create" />
        </form>
        <div className="list">
          <legend className="header">
            <li className="headerItem">ID</li>
            <li className="headerItem">TITLE</li>
            <li className="headerItem">DESCRIPTION</li>
            <li className="headerItem">STATUS</li>
          </legend>
          <section className="itemList">
            {tasksList.map((task) => (
              <TaskItem
                task={task}
                key={task.id}
                handleItemClick={handleItemClick}
                handleUpdateTask={handleUpdateTask}
              />
            ))}
          </section>
        </div>
      </div>
      {showModal && selectedItemId && (
        <ModalWindow
          selectedItem={tasksList[selectedItemId - 1]}
          handleCloseWindow={handleCloseWindow}
          handleUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
}

export default App;
