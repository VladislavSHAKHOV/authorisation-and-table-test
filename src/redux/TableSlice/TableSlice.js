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

      return allData;
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
    builder.addCase(getTableData.fulfilled, (state, action) => {
      state.table = action.payload;
    });
  },
});

export default tableSlice.reducer;

