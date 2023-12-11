import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "management-customer",
  initialState: {
    list: [],
    loading: true,
    currentPage: 0,
    postPerPage: 5,
    totalPage: 0,
    totalData: 0,
    search: "",
    statusFilter: "",
    showDetail: false,
    modal: false,
    modalStatus: "",
    modalImage: false,
    itemDetail: {},
    fieldName: "",
    orderBy: "",
    remark: false,
    modalTransaction: false
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
    setTotalData: (state, action) => {
      state.totalData = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
    setModalImage: (state, action) => {
      state.modalImage = action.payload;
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
    setRemark: (state, action) => {
      state.remark = action.payload;
    },
    setModalTransaction: (state, action) => {
      state.modalTransaction = action.payload;
    }
  },
});

export const {
  setList,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotalPage,
  setSearch,
  setStatusFilter,
  setShowDetail,
  setModal,
  setModalStatus,
  setModalImage,
  setItemDetail,
  setFieldName,
  setOrderBy,
  setTotalData,
  setRemark,
  setModalTransaction
} = reducerSlice.actions;

export default reducerSlice;
