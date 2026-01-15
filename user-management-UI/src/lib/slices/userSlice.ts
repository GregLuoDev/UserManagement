import { createSlice } from '@reduxjs/toolkit';
import { createUser, deleteUser, fetchUsers, updateUser } from '../thunks/userAsyncThunks';
import { User } from '../types';

type UserState = {
  users: User[];
  isLoadingUsers: boolean;
  fetchingUsersError: string;

  currentUser: User | null;
  isLoadingUser: boolean;
  isCreatingUser: boolean;
  isUpdatingUser: boolean;
  isDeletingUser: boolean;
  error: string;
};

const initialState: UserState = {
  users: [],
  isLoadingUsers: true,
  fetchingUsersError: '',

  currentUser: null,
  isLoadingUser: false,
  isCreatingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,
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
      .addCase(createUser.rejected, (state, action) => {
        state.isCreatingUser = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.isUpdatingUser = true;
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdatingUser = false;
        state.error = '';
        state.users = state.users.map((user) => {
          const newUser = action.payload;
          if (user.id === newUser.id) {
            return { ...user, ...newUser, updatedAt: new Date().toISOString() };
          }
          return user;
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdatingUser = false;
        state.error = action.payload as string;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isDeletingUser = true;
        state.error = '';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeletingUser = false;
        state.error = '';
        state.users = state.users.filter((t) => {
          const id = action.payload;
          return t.id !== id;
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeletingUser = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
