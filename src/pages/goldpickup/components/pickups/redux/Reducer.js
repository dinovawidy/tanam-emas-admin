import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "pickups",
  initialState: {
    list: [],
    loading: true,
    currentPage: 0,
    postPerPage: 5,
    total: 0,
    totalPage: 0,
    search: "",
    startDateFilter: "",
    endDateFilter: "",
    statusFilter: "",
    showDetail: false,
    itemDetail: {},
    fieldName: "",
    orderBy: "",
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPostPerPage: (state, action) => {
      state.postPerPage = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStartDateFilter: (state, action) => {
      state.startDateFilter = action.payload;
    },
    setEndDateFilter: (state, action) => {
      state.endDateFilter = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload;
    },
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
  },
});

export const {
  setList,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotal,
  setTotalPage,
  setSearch,
  setStartDateFilter,
  setEndDateFilter,
  setStatusFilter,
  setShowDetail,
  setItemDetail,
  setFieldName,
  setOrderBy,
} = reducerSlice.actions;
export default reducerSlice;
