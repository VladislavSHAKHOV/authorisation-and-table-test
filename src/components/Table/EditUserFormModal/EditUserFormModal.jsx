import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import userValidationSchema from "../../../utils/validationSchema";

const EditUserFormModal = ({
  open,
  onClose,
  onUpdateUser,
  existingUsers,
  userToEdit,
}) => {
  const [user, setUser] = useState({
    id: userToEdit ? userToEdit.id : null,
    name: userToEdit ? userToEdit.name : "",
    email: userToEdit ? userToEdit.email : "",
    birthday_date: userToEdit ? userToEdit.birthday_date : "",
    phone_number: userToEdit ? userToEdit.phone_number : "",
    address: userToEdit ? userToEdit.address : "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isNameUnique = (name) => {
    return !existingUsers.some((user) => user.name === name);
  };

  const isEmailUnique = (email) => {
    return !existingUsers.some((user) => user.email === email);
  };

  const isPhoneUnique = (phone) => {
    return !existingUsers.some((user) => user.phone_number === phone);
  };

  const handleUpdateUser = () => {
    userValidationSchema
      .validate(user, { abortEarly: false })
      .then(() => {
        if (
          isNameUnique(user.name) &&
          isEmailUnique(user.email) &&
          isPhoneUnique(user.phone_number)
        ) {
          console.log({ ...user, id: userToEdit.id });
          onUpdateUser({ ...user, id: userToEdit.id });
          setErrors({});
          onClose();
        } else {
          const validationErrors = {
            name: "name, email, or phone number is already taken",
          };
          setErrors(validationErrors);
        }
      })
      .catch((error) => {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
          style={{ marginTop: 6 }}
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          style={{ marginTop: 16 }}
        />
        <TextField
          label="birthday date"
          name="birthday_date"
          value={user.birthday_date}
          onChange={handleChange}
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.birthday_date}
          helperText={errors.birthday_date}
          style={{ marginTop: 16 }}
        />
        <TextField
          label="phone number"
          name="phone_number"
          value={user.phone_number}
          onChange={handleChange}
          fullWidth
          error={!!errors.phone_number}
          helperText={errors.phone_number}
          style={{ marginTop: 16 }}
        />
        <TextField
          label="address"
          name="address"
          value={user.address}
          onChange={handleChange}
          fullWidth
          error={!!errors.address}
          helperText={errors.address}
          style={{ marginTop: 16 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateUser} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserFormModal;
