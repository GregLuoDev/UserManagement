'use client';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Tooltip } from '@mui/material';
import DeleteConfirmDialog from '../dialogs/DeleteConfirmDialog';
import { useDialog } from '../dialogs/useDialog';

export function DeleteUserButton({ cardId }: { cardId: string }) {
  const { open, setOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handleOpenDialog}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>

      <DeleteConfirmDialog open={open} setOpen={setOpen} userId={cardId} />
    </>
  );
}
