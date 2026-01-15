import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserDto } from '../types';

const baseUrl = 'https://localhost:7086';

export const fetchUsers = createAsyncThunk('users', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/api/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue('Something went wrong');
  }
});

export const createUser = createAsyncThunk<User, UserDto>(
  'createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(`${baseUrl}/api/users`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue('Something went wrong');
    }
  },
);

export const updateUser = createAsyncThunk<UserDto, UserDto>(
  'updateUser',
  async (data, { rejectWithValue }) => {
    try {
      await axios.put<User>(`${baseUrl}/api/users/${data.id}`, data);
      return data;
    } catch (err) {
      return rejectWithValue('Something went wrong');
    }
  },
);

export const deleteUser = createAsyncThunk<string, string>(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete<User>(`${baseUrl}/api/users/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue('Something went wrong');
    }
  },
);
