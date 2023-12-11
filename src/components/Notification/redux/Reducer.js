import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "notificationHeader",
  initialState: {
    showNotif: false,
    page: "all",
    totalUnread: 0,
  },
  reducers: {
    setShowNotif: (state, action) => {
      state.showNotif = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalUnread: (state, action) => {
      state.totalUnread = action.payload;
    },
  },
});

export const { setShowNotif, setPage, setTotalUnread } = reducerSlice.actions;

export default reducerSlice;
