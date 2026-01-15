import { clearError } from '@/src/lib/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { updateUser } from '@/src/lib/thunks/userAsyncThunks';
import { RHFFormProvider } from '@/src/react-hook-form/RHFFormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { UserDto } from '../../lib/types';
import { TCard } from '../shared/types';
import { UserForm } from './UserForm';

type Props = {
  card: TCard;
  open: boolean;
  handleCloseDialog: () => void;
};

export function EditUserDialog({ card, open, handleCloseDialog }: Props) {
  const dispatch = useAppDispatch();
  const { isUpdatingUser, error } = useAppSelector((state) => state.user);
  const Schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.number().required('Status is required'),
  });

  const defaultValues: UserDto = {
    title: card.title ?? '',
    description: card.description ?? '',
    status: card.status ?? 0,
  };

  const methods = useForm<UserDto>({
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

  const canCloseDialog = isSubmitted && !error && !isUpdatingUser;
  const shouldShowError = isSubmitted && !isDirty && error && !isUpdatingUser;

  useEffect(() => {
    if (canCloseDialog) {
      handleCloseDialog();
      dispatch(clearError());
    }
  }, [canCloseDialog]);

  function handleUpdateUser() {
    dispatch(updateUser({ ...card, ...formValues }));
    reset(formValues, {
      keepValues: true, // keeps the current form values
      keepErrors: false, // clears errors
      keepDirty: false, // clears dirty state
      keepTouched: false, // clears touched state
      keepIsSubmitted: true,
      keepSubmitCount: true,
    });
  }

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return; // ignore auto-close
        }
        handleCloseDialog();
        dispatch(clearError());
      }}
      aria-labelledby="create-new-user"
      slotProps={{
        paper: {
          sx: {
            width: '500px', // fixed width
            maxWidth: 'none', // prevent shrinking
          },
        },
      }}
    >
      <RHFFormProvider methods={methods} onSubmit={handleSubmit(handleUpdateUser)}>
        <DialogTitle variant="h4">Edit User</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
        <DialogActions className="m-4">
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>

          <div>
            {isUpdatingUser && !error ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                color="primary"
                autoFocus
                disabled={
                  !formValues['title'] || !formValues['description'] || !isValid || !isDirty
                }
                variant="contained"
              >
                Update
              </Button>
            )}
          </div>
        </DialogActions>
      </RHFFormProvider>

      {shouldShowError && (
        <Alert severity="error" className="m-6 mt-2">
          Cannot update this user. Please try again.
        </Alert>
      )}
    </Dialog>
  );
}
