import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "accountsettings",
  initialState: {
    page: "editprofile",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = reducerSlice.actions;

export default reducerSlice;
