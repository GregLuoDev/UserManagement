'use client';

import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fetchUsers } from '@/src/lib/thunks/userAsyncThunks';
import { CreateUserButton } from '@/src/user-management/buttons/CreateUserButton';
import { UsersList } from '@/src/user-management/users-list/UsersList';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { users, isLoadingUsers, fetchingUsersError } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-4">
      <Typography variant="h3" gutterBottom>
        User Management
      </Typography>

      <CreateUserButton />

      <div className="my-4">
        {isLoadingUsers && !fetchingUsersError && <CircularProgress />}
        {!isLoadingUsers && !!fetchingUsersError && (
          <Alert severity="error">Cannot fetch users. Please try again.</Alert>
        )}
        users:{users.length}
        {!isLoadingUsers && !fetchingUsersError && <UsersList />}
      </div>
    </div>
  );
}
