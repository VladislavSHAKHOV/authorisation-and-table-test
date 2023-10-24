import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserName,
  setPassword,
  getUsers,
  setError,
} from "../../redux/LogInSlice/LogInSlice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, CircularProgress } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.logIn.error);

  const isLoading = useSelector((state) => state.logIn.requestPending);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(setUserName(data.get("name")));
    dispatch(setPassword(data.get("password")));

    try {
      await dispatch(getUsers());
    } catch (err) {
      dispatch(setError("Invalid username or password"));
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              style={{ position: "relative" }}
            >
              <div style={{ width: "400px", height: "200px" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 0,
                  }}
                >
                  <CircularProgress
                    style={{ position: "absolute", left: 172, top: 290 }}
                  />
                </Box>
              )}
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
