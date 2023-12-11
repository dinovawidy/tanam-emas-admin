import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "goldpricing",
  initialState: {
    changeLogList: [],
    totalData: 0,
    currentPage: 0,
    totalPage: 1,
    currentPrice: { price: 0, persentage: 0 },
    loadingChart: false,
    loadingChangeLog: false,
    newPrice: "",
    showConfirmModal: false,
    startDate: "",
    endDate: "",
    graphicList: [],
  },
  reducers: {
    setChangeLogList: (state, action) => {
      state.changeLogList = action.payload;
    },
    setTotalData: (state, action) => {
      state.totalData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setCurrentPrice: (state, action) => {
      state.currentPrice = action.payload;
    },
    setLoadingChart: (state, action) => {
      state.loadingChart = action.payload;
    },
    setLoadingChangeLog: (state, action) => {
      state.loadingChangeLog = action.payload;
    },
    setNewPrice: (state, action) => {
      state.newPrice = action.payload;
    },
    setShowConfirmModal: (state, action) => {
      state.showConfirmModal = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setGraphicList: (state, action) => {
      state.graphicList = action.payload;
    },
  },
});

export const {
  setChangeLogList,
  setTotalData,
  setCurrentPage,
  setTotalPage,
  setCurrentPrice,
  setLoadingChart,
  setLoadingChangeLog,
  setNewPrice,
  setShowConfirmModal,
  setStartDate,
  setEndDate,
  setGraphicList,
} = reducerSlice.actions;
export default reducerSlice;
