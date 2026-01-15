import { clearError } from '@/src/lib/slices/userSlice';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { deleteUser } from '../../lib/thunks/userAsyncThunks';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
};

export default function DeleteConfirmDialog({ open, setOpen, userId }: Props) {
  const { isDeletingUser, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted && !isDeletingUser && !error) {
      setOpen(false);
    }
  }, [deleted, isDeletingUser, error]);

  function handleClose() {
    setOpen(false);
    dispatch(clearError());
  }

  function handleDeleteUser() {
    dispatch(deleteUser(userId));
    setDeleted(true);
  }

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return; // ignore auto-close
        }
        handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Please confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="mr-4 mb-4">
        <Button onClick={handleClose}>No</Button>

        <div>
          {isDeletingUser && !error ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleDeleteUser} autoFocus variant="outlined" color="error">
              Yes
            </Button>
          )}
        </div>
      </DialogActions>

      {!!error && (
        <Alert severity="error" className="m-6 mt-2">
          Cannot delete this user. Please try again.
        </Alert>
      )}
    </Dialog>
  );
}
