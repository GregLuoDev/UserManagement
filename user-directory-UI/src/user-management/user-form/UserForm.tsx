'use client';

import { RHFTextField } from '@/src/react-hook-form/RHFTextField';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { createUser } from '@/src/lib/thunks/userAsyncThunks';
import { RHFFormProvider } from '@/src/react-hook-form/RHFFormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, CircularProgress, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { UserDTO } from '../../lib/types';

export function UserForm() {
  const dispatch = useAppDispatch();
  const { isCreatingUser, error } = useAppSelector((state) => state.user);
  const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('State is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('Age is required'),
    pincode: Yup.string().required('Pincode is required'),
  });

  const defaultValues: UserDTO = {
    name: '',
    age: 0,
    city: '',
    state: '',
    pincode: '',
  };

  const methods = useForm<UserDTO>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const {
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitted, isDirty },
  } = methods;

  const formValues = watch();

  const shouldShowError = isSubmitted && !isDirty && error && !isCreatingUser;
  const shouldShowSuccess = isSubmitted && !isDirty && !error && !isCreatingUser;

  function handleCreateUser() {
    dispatch(createUser(formValues));
    reset(formValues, {
      keepValues: true, // keeps the current form values
      keepErrors: false, // clears errors
      keepDirty: false, // clears dirty state
      keepTouched: false, // clears touched state
      keepIsSubmitted: true,
      keepSubmitCount: true,
    });
  }

  function handleReset() {
    reset(defaultValues);
  }

  const disableCreateButton = !isValid || !isDirty;

  return (
    <div className="mt-2">
      <RHFFormProvider methods={methods} onSubmit={handleSubmit(handleCreateUser)}>
        <Grid container spacing={2} className="mt-6">
          <Grid size={4}>
            <RHFTextField name="name" label="Name" />
          </Grid>
          <Grid size={4}>
            <RHFTextField name="age" label="age" />
          </Grid>
          <Grid size={4}>
            <RHFTextField name="city" label="city" />
          </Grid>
          <Grid size={4}>
            <RHFTextField name="state" label="state" />
          </Grid>
          <Grid size={4}>
            <RHFTextField name="pincode" label="pincode" />
          </Grid>
        </Grid>

        <Stack className="m-4" direction="row" justifyContent="space-between">
          <Button onClick={handleReset} color="primary">
            Reset
          </Button>

          {isCreatingUser && !error ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              color="primary"
              autoFocus
              disabled={disableCreateButton}
              variant="contained"
            >
              Create New User
            </Button>
          )}
        </Stack>
      </RHFFormProvider>

      {shouldShowError && (
        <Alert severity="error" className="m-6 mt-2">
          <div>Cannot create this user. Please try again.</div>
          {error}
        </Alert>
      )}

      {shouldShowSuccess && (
        <Alert severity="success" className="m-6 mt-2">
          <div>The user has been created.</div>
          {error}
        </Alert>
      )}
    </div>
  );
}
