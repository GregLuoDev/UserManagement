import { createSlice } from '@reduxjs/toolkit';
import { createUser, fetchUsers } from '../thunks/userAsyncThunks';
import { User } from '../types';

type UserState = {
  users: User[];
  isLoadingUsers: boolean;
  fetchingUsersError: string;

  currentUser: User | null;
  isCreatingUser: boolean;
  error: string;
};

const initialState: UserState = {
  users: [],
  isLoadingUsers: true,
  fetchingUsersError: '',

  currentUser: null,
  isCreatingUser: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoadingUsers = true;
        state.fetchingUsersError = '';
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoadingUsers = false;
        state.users = action.payload;
        state.fetchingUsersError = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoadingUsers = false;
        state.fetchingUsersError = action.payload as string;
        state.users = [];
      })

      .addCase(createUser.pending, (state) => {
        state.isCreatingUser = true;
        state.error = '';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreatingUser = false;
        state.error = '';
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action: any) => {
        state.isCreatingUser = false;
        const errorMessage = Object.entries(action.payload?.response?.data?.errors)
          .map(([key, value]) => `${key}: ${(value as any).join(',')}`)
          .join(' ');
        state.error = errorMessage;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
