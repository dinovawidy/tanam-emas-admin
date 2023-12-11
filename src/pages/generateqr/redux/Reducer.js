import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "qrcode",
  initialState: {
    page: "main",
    data: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPage, setData } = reducerSlice.actions;
export default reducerSlice;
