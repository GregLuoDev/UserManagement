import { UserForm } from '@/src/user-management/user-form/UserForm';
import { Typography } from '@mui/material';

export default function AddPage() {
  return (
    <>
      <Typography variant="h4">Create New User</Typography>
      <UserForm />
    </>
  );
}
