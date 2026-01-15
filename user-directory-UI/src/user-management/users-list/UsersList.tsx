import { useAppSelector } from '@/src/lib/store';
import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'city', headerName: 'City', width: 130 },
  {
    field: 'state',
    headerName: 'State',
    sortable: false,
    width: 160,
  },
  {
    field: 'pincode',
    headerName: 'Pin Code',
    sortable: false,
    width: 160,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export function UsersList() {
  const { users } = useAppSelector((state) => state.user);

  return (
    <Paper sx={{ height: 400, width: '100%' }} className="mt-4">
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
