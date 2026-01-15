'use client';

import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fetchUsers } from '@/src/lib/thunks/userAsyncThunks';
import { UsersList } from '@/src/user-management/users-list/UsersList';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function ListPage() {
  const dispatch = useAppDispatch();
  const { isLoadingUsers, fetchingUsersError } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-4">
      <div className="my-4">
        {isLoadingUsers && !fetchingUsersError && <CircularProgress />}
        {!isLoadingUsers && !!fetchingUsersError && (
          <Alert severity="error">Cannot fetch users. Please try again.</Alert>
        )}

        {!isLoadingUsers && !fetchingUsersError && <UsersList />}
      </div>
    </div>
  );
}
