import { RHFSelect } from '@/src/react-hook-form/RHFSelect';
import { RHFTextField } from '@/src/react-hook-form/RHFTextField';
import { MenuItem } from '@mui/material';

export function UserForm() {
  return (
    <div className="mt-2">
      {/* <RHFTextField name="title" label="Title" /> */}

      <div className="my-6">
        <RHFTextField name="description" label="Description" multiline minRows={3} />
      </div>

      <RHFSelect name="status" label="Status">
        <MenuItem value={0}>To Do</MenuItem>
        <MenuItem value={1}>In Progress</MenuItem>
        <MenuItem value={2}>Done</MenuItem>
      </RHFSelect>
    </div>
  );
}
