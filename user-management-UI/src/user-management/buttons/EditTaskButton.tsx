'use client';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import { EditUserDialog } from '../dialogs/EditUserDialog';
import { useDialog } from '../dialogs/useDialog';
import { TCard } from '../shared/types';

export function EditUserButton({ card }: { card: TCard }) {
  const { open, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpenDialog}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <EditUserDialog
        open={open}
        card={card}
        handleCloseDialog={handleCloseDialog}
        key={open.toString()}
      />
    </>
  );
}
