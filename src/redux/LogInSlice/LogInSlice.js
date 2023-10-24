import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || false,
  logInData: {
    username: "",
    password: "",
  },
  error: null,
  requestPending: false, 
};

export const getUsers = createAsyncThunk(
  "LogIn/getUsers",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const logInData = state.logIn.logInData;
      console.log(logInData);

      dispatch(setRequestPending(true)); 
      const result = await axios.post(
        "https://technical-task-api.icapgroupgmbh.com/api/login/",
        logInData
      );

      console.log(result);
      dispatch(logInSlice.actions.setUser(true)); 
      return result.data;
    } catch (error) {
      console.error("Error fetching user", error);

      if (error.response && error.response.status === 401) {
        return rejectWithValue("Invalid username or password");
      } else if (error.response && error.response.status === 400) {
        return rejectWithValue("The fields can't be empty");
      } else {
        return rejectWithValue("An error occurred while logging in.");
      }
    } finally {
      dispatch(setRequestPending(false)); 
    }
  }
);

export const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.logInData.username = action.payload;
      state.error = null;
    },
    setPassword: (state, action) => {
      state.logInData.password = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    setRequestPending: (state, action) => {
      state.requestPending = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.logInData = action.payload;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUserName, setPassword, setError, setRequestPending, setUser } = logInSlice.actions;

export default logInSlice.reducer;
