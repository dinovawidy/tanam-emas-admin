import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "helpcenter",
  initialState: {
    page: "merchant",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = reducerSlice.actions;

export default reducerSlice;
