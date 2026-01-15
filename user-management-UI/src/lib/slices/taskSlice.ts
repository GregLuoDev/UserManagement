import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../types';
import { createTask, deleteTask, fetchTasks, updateTask } from '../thunks/taskAsyncThunks';

type TaskState = {
  tasks: Task[];
  isLoadingTasks: boolean;
  fetchingTasksError: string;

  currentTask: Task | null;
  isLoadingTask: boolean;
  isCreatingTask: boolean;
  isUpdatingTask: boolean;
  isDeletingTask: boolean;
  error: string;
};

const initialState: TaskState = {
  tasks: [],
  isLoadingTasks: true,
  fetchingTasksError: '',

  currentTask: null,
  isLoadingTask: false,
  isCreatingTask: false,
  isUpdatingTask: false,
  isDeletingTask: false,
  error: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoadingTasks = true;
        state.fetchingTasksError = '';
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoadingTasks = false;
        state.tasks = action.payload;
        state.fetchingTasksError = '';
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoadingTasks = false;
        state.fetchingTasksError = action.payload as string;
        state.tasks = [];
      })

      .addCase(createTask.pending, (state) => {
        state.isCreatingTask = true;
        state.error = '';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isCreatingTask = false;
        state.error = '';
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isCreatingTask = false;
        state.error = action.payload as string;
      })

      .addCase(updateTask.pending, (state) => {
        state.isUpdatingTask = true;
        state.error = '';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isUpdatingTask = false;
        state.error = '';
        state.tasks = state.tasks.map((task) => {
          const newTask = action.payload;
          if (task.id === newTask.id) {
            return { ...task, ...newTask, updatedAt: new Date().toISOString() };
          }
          return task;
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isUpdatingTask = false;
        state.error = action.payload as string;
      })

      .addCase(deleteTask.pending, (state) => {
        state.isDeletingTask = true;
        state.error = '';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isDeletingTask = false;
        state.error = '';
        state.tasks = state.tasks.filter((t) => {
          const id = action.payload;
          return t.id !== id;
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isDeletingTask = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
