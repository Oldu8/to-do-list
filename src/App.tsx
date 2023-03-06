import { useCallback, useState } from "react";
import "./App.css";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import MemoizedTaskItem from "./components/TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { RootState } from "./redux/interfaces";
import InputControlls from "./components/InputControlls/InputControlls";

function App() {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const todos = useSelector((state: RootState) => state.todos);

  const handleItemClick = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  // const handleItemClick = (id: number) => {
  //   setSelectedItemId(id);
  // };

  const handleCloseWindow = () => {
    setSelectedItemId(null);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h2 className="title">To do list</h2>
        <InputControlls />
        <div className="list">
          <legend className="header">
            <li className="headerItem">ID</li>
            <li className="headerItem">TITLE</li>
            <li className="headerItem">DESCRIPTION</li>
            <li className="headerItem">STATUS</li>
          </legend>
          <section className="itemList">
            {todos.map((task) => (
              <MemoizedTaskItem
                task={task}
                key={task.id.toString()}
                handleItemClick={handleItemClick}
              />
            ))}
          </section>
        </div>
      </div>
      {selectedItemId && (
        <ModalWindow
          taskId={selectedItemId}
          handleCloseWindow={handleCloseWindow}
        />
      )}
    </div>
  );
}

export default App;
