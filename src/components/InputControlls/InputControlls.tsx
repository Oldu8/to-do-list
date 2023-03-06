import React, { useState, FocusEvent } from "react";
import { useDispatch } from "react-redux";
import { IErrors, IFormData } from "../../interface";
import { addTodo } from "../../redux/todosSlice";
import InputSection from "../InputSection/InputSection";

const intialFormData = {
  taskTitle: "",
  taskDescription: "",
};

function InputControlls() {
  const [formData, setFormData] = useState(intialFormData);
  const [errors, setErrors] = useState<IErrors>(intialFormData);

  const dispatch = useDispatch();
  const addTask = (item: IFormData) => {
    dispatch(addTodo(item));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("handle change func");

    setFormData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { taskDescription, taskTitle } = formData;

    /// Validation
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
    console.log("on submit func");
    addTask(formData);
    setFormData(intialFormData);
  };

  return (
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
  );
}

export default InputControlls;
