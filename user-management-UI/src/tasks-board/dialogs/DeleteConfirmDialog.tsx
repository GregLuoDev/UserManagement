import { clearError } from '@/src/lib/slices/taskSlice';
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
import { deleteTask } from '../../lib/thunks/taskAsyncThunks';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  taskId: string;
};

export default function DeleteConfirmDialog({ open, setOpen, taskId }: Props) {
  const { isDeletingTask, error } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted && !isDeletingTask && !error) {
      setOpen(false);
    }
  }, [deleted, isDeletingTask, error]);

  function handleClose() {
    setOpen(false);
    dispatch(clearError());
  }

  function handleDeleteTask() {
    dispatch(deleteTask(taskId));
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
          Are you sure you want to delete this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="mr-4 mb-4">
        <Button onClick={handleClose}>No</Button>

        <div>
          {isDeletingTask && !error ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleDeleteTask} autoFocus variant="outlined" color="error">
              Yes
            </Button>
          )}
        </div>
      </DialogActions>

      {!!error && (
        <Alert severity="error" className="m-6 mt-2">
          Cannot delete this task. Please try again.
        </Alert>
      )}
    </Dialog>
  );
}
