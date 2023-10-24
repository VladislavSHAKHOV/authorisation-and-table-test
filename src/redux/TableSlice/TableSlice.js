import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  table: [],
};

export const getTableData = createAsyncThunk(
  "table/getTableData",
  async (_, { rejectWithValue }) => {
    try {
      let allData = [];
      let nextUrl = "https://technical-task-api.icapgroupgmbh.com/api/table/";

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allData = [...allData, ...response.data.results];
        nextUrl = response.data.next;
      }
      console.log(allData);
      return allData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUserToServer = createAsyncThunk(
  "table/addUserToServer",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://technical-task-api.icapgroupgmbh.com/api/table/",
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserOnServer = createAsyncThunk(
  "table/updateUserOnServer",
  async (user, { rejectWithValue }) => {
    console.log(user);
    try {
      const response = await axios.put(
        `https://technical-task-api.icapgroupgmbh.com/api/table/${user.id}/`,
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableData.fulfilled, (state, action) => {
        state.table = action.payload;
      })
      .addCase(addUserToServer.fulfilled, (state, action) => {
        state.table.push(action.payload);
      })
      .addCase(updateUserOnServer.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.table.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (userIndex !== -1) {
          state.table[userIndex] = updatedUser;
        }
      });
  },
});

export default tableSlice.reducer;
