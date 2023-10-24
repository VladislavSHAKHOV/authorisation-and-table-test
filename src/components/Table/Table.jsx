import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToServer, getTableData, updateUserOnServer } from '../../redux/TableSlice/TableSlice';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import AddUserFormModal from './AddUserForm/AddUserFormModal';
import EditUserFormModal from './EditUserFormModal/EditUserFormModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'birthday_date',
    headerName: 'Date of birth',
    type: 'date',
    width: 140,
    editable: true,
    valueGetter: (params) => {
      const parts = params.value.split('-');
      const year = parseInt(parts[2]) + 2000;
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
    headerName: 'Phone',
    sortable: false,
    editable: true,
    width: 160,
  },
  {
    field: 'address',
    headerName: 'Address',
    sortable: false,
    editable: true,
    width: 160,
  },
];

const Table = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.table);
  const isDataLoaded = tableData.length > 0;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddUser = (user) => {
    dispatch(addUserToServer(user));
    setModalOpen(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = (user) => {
    const userToUpdate = {
      id: user.id,
      name: user.name,
      email: user.email,
      birthday_date: user.birthday_date,
      phone_number: user.phone_number,
      address: user.address,
    };
  
    dispatch(updateUserOnServer(userToUpdate))
      .then((result) => {
        if (updateUserOnServer.fulfilled.match(result)) {
          setEditModalOpen(false);
        }
      });
  };

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(getTableData());
    }
  }, [dispatch, isDataLoaded]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add User +
      </Button>
      <AddUserFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddUser={handleAddUser}
        existingUsers={tableData}
      />
      <EditUserFormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdateUser={handleUpdateUser}
        existingUsers={tableData}
        userToEdit={selectedUser}
      />
      <Box sx={{ height: 600, width: '100%' }}>
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
            pageSizeOptions={[10, 20, 30, 100]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={(params) => handleEditUser(params.row)}
          />
        )}
      </Box>
    </>
  );
};

export default Table;
