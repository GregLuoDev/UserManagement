'use client';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import { EditTaskDialog } from '../dialogs/EditTaskDialog';
import { useDialog } from '../dialogs/useDialog';
import { TCard } from '../shared/types';

export function EditTaskButton({ card }: { card: TCard }) {
  const { open, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpenDialog}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <EditTaskDialog
        open={open}
        card={card}
        handleCloseDialog={handleCloseDialog}
        key={open.toString()}
      />
    </>
  );
}
