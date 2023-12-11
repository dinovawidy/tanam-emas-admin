import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "goldpickup",
  initialState: {
    page: "merchantList",
    selectedMerchant: {},
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedMerchant: (state, action) => {
      state.selectedMerchant = action.payload;
    },
  },
});

export const {
  setPage,
  setSelectedMerchant,
} = reducerSlice.actions;
export default reducerSlice;
