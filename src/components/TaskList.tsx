import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../store/tasksSlice";
import { RootState, AppDispatch } from "../store/store";

const TaskList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-danger">Erreur : {error}</p>;

    return (
        <div className="task">
            <h2 className="text">Liste des tâches</h2>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tâche</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.title}
                            </td>
                            <td>
                                {task.completed ? (
                                    <span className="badge bg-success">Terminée</span>
                                ) : (
                                    <span className="badge bg-warning text-dark">En cours</span>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => dispatch(deleteTask(task.id))}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
