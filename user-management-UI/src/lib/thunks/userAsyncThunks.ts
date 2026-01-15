import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserDTO } from '../types';

const baseUrl = 'https://localhost:7086';

export const fetchUsers = createAsyncThunk('users', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/api/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createUser = createAsyncThunk<User, UserDTO>(
  'createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(`${baseUrl}/api/users`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

