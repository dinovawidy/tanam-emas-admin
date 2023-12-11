import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "balance",
  initialState: {
    list: [],
    data: {},
    popup: false,
    startDateFilter: "",
    endDateFilter: "",
    inquiry: {},
    canWithdraw: {},
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = action.payload;
    },
    setStartDateFilter: (state, action) => {
      state.startDateFilter = action.payload;
    },
    setEndDateFilter: (state, action) => {
      state.endDateFilter = action.payload;
    },
    setInquiry: (state, action) => {
      state.inquiry = action.payload;
    },
    setCanWithdraw: (state, action) => {
      state.canWithdraw = action.payload;
    },
  },
});

export const {
  setList,
  setPopup,
  setData,
  setStartDateFilter,
  setEndDateFilter,
  setInquiry,
  setCanWithdraw,
} = reducerSlice.actions;

export default reducerSlice;
