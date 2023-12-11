import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "ProfilDropdown",
  initialState: {
    showDropdown: false,
    data: {},
  },
  reducers: {
    setShowDropdown: (state, action) => {
      state.showDropdown = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setShowDropdown, setData } = reducerSlice.actions;

export default reducerSlice;
