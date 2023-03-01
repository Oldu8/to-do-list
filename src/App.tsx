import { useState, FocusEvent, useEffect } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem/TaskItem";
import { ITask } from "./interface";

const intialFormData = {
  taskTitle: "",
  taskDescription: "",
};

interface IErrors {
  taskTitle?: string;
  taskDescription?: string;
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [formData, setFormData] = useState(intialFormData);
  const [tasksList, setTasksList] = useState<[] | ITask[]>([]);
  const [errors, setErrors] = useState<IErrors>(intialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!formData.taskDescription && !formData.taskTitle) {
      console.log("2 errors");
      return setErrors({
        ["taskTitle"]: "This field is empty",
        ["taskDescription"]: "This field is empty",
      });
    }
    if (!formData.taskTitle) {
      console.log("title error");

      return setErrors((ers) => {
        return {
          ...ers,
          ["taskTitle"]: "This field is empty",
        };
      });
    }
    if (!formData.taskDescription) {
      console.log("desc error");
      return setErrors((ers) => {
        return {
          ...ers,
          ["taskDescription"]: "This field is empty",
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
    const isEmpty = !!value.trim().length; // false / true
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

  return (
    <div className="App">
      <div className="wrapper">
        <h2 className="title">To do list</h2>
        <form className="inputsBlock" onSubmit={onSubmit}>
          <section className="inputSection">
            <label className="subtitle">Title:</label>
            <input
              onChange={handleChange}
              value={formData.taskTitle}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="text"
              className={errors["taskTitle"] ? "input error" : "input"}
              placeholder="Task title..."
              name="taskTitle"
            />
            {errors.taskTitle && (
              <div className="errorMessage">This field is empty</div>
            )}
          </section>
          <section className="inputSection">
            <label className="subtitle">Description:</label>
            <input
              onChange={handleChange}
              value={formData.taskDescription}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="text"
              className={errors["taskDescription"] ? "input error" : "input"}
              placeholder="Task description..."
              name="taskDescription"
            />
            {errors.taskDescription && (
              <div className="errorMessage">This field is empty</div>
            )}
          </section>
          <input type="submit" className="btn" value="Create" />
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
              <TaskItem task={task} key={task.id} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
