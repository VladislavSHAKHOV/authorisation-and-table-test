import { configureStore } from "@reduxjs/toolkit";
import LogInSlice from "./LogInSlice/LogInSlice";
import tableSlice from "./TableSlice/TableSlice";


const store = configureStore({
  reducer: {
    logIn: LogInSlice,
    table: tableSlice,
  },
});

export default store;
