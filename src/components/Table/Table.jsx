import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getTableData } from '../../redux/TableSlice/TableSlice';
import { useEffect } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Имя',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'birthday_date',
    headerName: 'Дата рождения',
    type: 'date',
    width: 140,
    editable: true,
    valueGetter: (params) => {
      const parts = params.value.split('-');
      const year = parseInt(parts[2]) + 1900; 
      const month = parseInt(parts[1]) - 1; 
      const day = parseInt(parts[0]);
      return new Date(year, month, day);
    },
    sortComparator: (v1, v2) => {
      const date1 = v1;
      const date2 = v2;
      return date1 - date2;
    },
  },
  {
    field: 'phone_number',
    headerName: 'Телефон',
    sortable: false,
    width: 160,
  }
];

const Table = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.table);
  const isDataLoaded = tableData.length > 0;

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(getTableData());
    }
  }, [dispatch, isDataLoaded]);

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      {isDataLoaded && (
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 30, tableData.length]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default Table;
