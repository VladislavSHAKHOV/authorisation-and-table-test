import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/LogInSlice/LogInSlice";

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.logIn.user);

  const handleExit = () => {
    dispatch(setUser(false))
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent={"flex-end"}>
            {user ? (
              <Button onClick={handleExit} variant="contained">Exit</Button>
            ) : (
              <NavLink to={LOGIN_ROUTE}>
                <Button variant="contained">Log In</Button>
              </NavLink>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
