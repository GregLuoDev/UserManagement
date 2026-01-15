import { useState } from 'react';

export function useDialog() {
  const [open, setOpen] = useState(false);
  function handleOpenDialog() {
    setOpen(true);
  }

  function handleCloseDialog() {
    setOpen(false);
  }

  return { open, setOpen, handleOpenDialog, handleCloseDialog };
}
