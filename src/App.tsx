import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="appMain container mt-2">
        <h1>Gestionnaire de tâches</h1>
        <AddTask />
        <TaskList />
      </div>
    </Provider>
  );
};

export default App;
