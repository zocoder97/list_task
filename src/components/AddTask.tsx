import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import { AppDispatch } from "../store/store";
import "./add-task.css"

const AddTask: React.FC = () => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTask = () => {
        if (title.trim()) {
            dispatch(addTask(title));
            setTitle("");
        }
    };

    return (
        <div className="add-task">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nouvelle tâche"

                className="form-control"
            />
            <button onClick={handleAddTask} className="btn  btn-primary"><i className="bi bi-plus"></i>Ajouter</button>
        </div>
    );
};

export default AddTask;