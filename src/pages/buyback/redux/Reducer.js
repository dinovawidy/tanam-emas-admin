import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "buyback",
  initialState: {
    page: "main",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = reducerSlice.actions;
export default reducerSlice;
