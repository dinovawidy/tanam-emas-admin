import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "sidebar",
  initialState: {
    show: true,
    pageActive: "",
    menu: [],
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setPageActive: (state, action) => {
      state.pageActive = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setShow, setPageActive, setMenu } = reducerSlice.actions;
export default reducerSlice;
