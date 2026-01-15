import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task, TaskDto } from '../types';

const baseUrl = 'https://localhost:7086';

export const fetchTasks = createAsyncThunk('tasks', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/api/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue('Something went wrong');
  }
});

export const createTask = createAsyncThunk<Task, TaskDto>(
  'createTask',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<Task>(`${baseUrl}/api/tasks`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue('Something went wrong');
    }
  },
);

export const updateTask = createAsyncThunk<TaskDto, TaskDto>(
  'updateTask',
  async (data, { rejectWithValue }) => {
    try {
      await axios.put<Task>(`${baseUrl}/api/tasks/${data.id}`, data);
      return data;
    } catch (err) {
      return rejectWithValue('Something went wrong');
    }
  },
);

export const deleteTask = createAsyncThunk<string, string>(
  'deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete<Task>(`${baseUrl}/api/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue('Something went wrong');
    }
  },
);
