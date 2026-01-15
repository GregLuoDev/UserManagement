import { Button } from '@mui/material';
import { CreateUserDialog } from '../dialogs/CreateUserDialog';
import { useDialog } from '../dialogs/useDialog';

export function CreateUserButton() {
  const { open, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
        Create New User
      </Button>

      <CreateUserDialog open={open} handleCloseDialog={handleCloseDialog} key={open.toString()} />
    </>
  );
}
