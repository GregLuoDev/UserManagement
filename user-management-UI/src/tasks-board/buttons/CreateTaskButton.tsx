import { Button } from '@mui/material';
import { CreateTaskDialog } from '../dialogs/CreateTaskDialog';
import { useDialog } from '../dialogs/useDialog';

export function CreateTaskButton() {
  const { open, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
        Create New Task
      </Button>

      <CreateTaskDialog open={open} handleCloseDialog={handleCloseDialog} key={open.toString()} />
    </>
  );
}
