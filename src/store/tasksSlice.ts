import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Type des tâches
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// État initial
interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null
};

// Thunk pour récupérer les tâches
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 20);
});

// Ajouter une tâche 
export const addTask = createAsyncThunk("tasks/addTask", async (title: string) => {
  return { id: Date.now(), title, completed: false };
});

// Supprimer une tâche 
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: number) => {
  return id;
});

// Slice Redux
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors de la récupération des tâches.";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  }
});

export default tasksSlice.reducer;
