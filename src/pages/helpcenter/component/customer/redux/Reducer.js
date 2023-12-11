import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "customer",
  initialState: {
    list: [],
    detailCustomer: {},
    loading: true,
    currentPage: 0,
    postPerPage: 5,
    totalData: 0,
    totalPage: 0,
    search: "",
    fieldName: "",
    orderBy: "",
    statusFilter: "",
    modalStatus: "",
    type: "",
    showDetail: false,
    modalResolved: false,
    modalReqResolved: false,
    modalSendEmail: false,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setDetailCustomer: (state, action) => {
      state.detailCustomer = action.payload;
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
    setTotalData: (state, action) => {
      state.totalData = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setModalResolved: (state, action) => {
      state.modalResolved = action.payload;
    },
    setModalReqResolved: (state, action) => {
      state.modalReqResolved = action.payload;
    },
    setModalSendEmail: (state, action) => {
      state.modalSendEmail = action.payload;
    },
  },
});

export const {
  setList,
  setDetailCustomer,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotalData,
  setTotalPage,
  setSearch,
  setStatusFilter,
  setOrderBy,
  setFieldName,
  setType,
  setModalStatus,
  setShowDetail,
  setModalResolved,
  setModalReqResolved,
  setModalSendEmail,
} = reducerSlice.actions;

export default reducerSlice;
