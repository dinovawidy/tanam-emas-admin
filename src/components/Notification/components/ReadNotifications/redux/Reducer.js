import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "readNotifications",
  initialState: {
    list: [],
    currentPage: 0,
    hasMoreItems: true,
    loadingData: false,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setHasMoreItems: (state, action) => {
      state.hasMoreItems = action.payload;
    },
    setLoadingData: (state, action) => {
      state.loadingData = action.payload;
    },
  },
});

export const { setList, setCurrentPage, setHasMoreItems, setLoadingData } =
  reducerSlice.actions;

export default reducerSlice;
