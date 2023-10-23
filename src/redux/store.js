import { configureStore } from "@reduxjs/toolkit";
import LogInSlice from "./LogInSlice/LogInSlice";


const store = configureStore({
  reducer: {
    logIn: LogInSlice,

  },
});

export default store;
