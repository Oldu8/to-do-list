import { useState, FocusEvent } from "react";
import "./App.css";
import InputSection from "./components/InputSection/InputSection";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import TaskItem from "./components/TaskItem/TaskItem";
import { IErrors, IFormData, ITask } from "./interface";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./redux/todosSlice";
import { RootState } from "./redux/interfaces";

const intialFormData = {
  taskTitle: "",
  taskDescription: "",
};

function App() {
  const [formData, setFormData] = useState(intialFormData);
  const [errors, setErrors] = useState<IErrors>(intialFormData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const addTask = (item: IFormData) => {
    dispatch(addTodo(item));
  };

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
    const { taskDescription, taskTitle } = formData;
    if (!taskDescription && !taskTitle) {
      return setErrors({
        ["taskTitle"]: "Title field is empty",
        ["taskDescription"]: "Description field is empty",
      });
    }
    if (!taskTitle) {
      return setErrors((ers) => {
        return {
          ...ers,
          ["taskTitle"]: "Title field is empty",
        };
      });
    }
    if (!taskDescription) {
      return setErrors((ers) => {
        return {
          ...ers,
          ["taskDescription"]: "Description field is empty",
        };
      });
    }
    addTask({ ...formData });
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
            {todos.map((task) => (
              <TaskItem
                task={task}
                key={task.id}
                handleItemClick={handleItemClick}
              />
            ))}
          </section>
        </div>
      </div>
      {showModal && selectedItemId && (
        <ModalWindow
          taskId={selectedItemId}
          handleCloseWindow={handleCloseWindow}
        />
      )}
    </div>
  );
}

export default App;
