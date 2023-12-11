import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "admin",
  initialState: {
    list: [],
    detailProduct: {},
    detailVariant:{},
    loading: true,
    currentPage: 0,
    postPerPage: 5,
    total: 0,
    totalPage: 0,
    search: "",
    showDetail: false,
    modalTakedown: false,
    modalReqTakedown: false,
    modalDecline: false,
    modalChecked: false,
    modalInactive: false,
    modalActive: false,
    modalImage: false,
    modalDetail: false,
    titleImage: "",
    srcImage: "",
    startDateFilter: "",
    endDateFilter: "",
    statusFilter: "",
    fieldName: "",
    orderBy: "",
    categoryId: "",
    id: {},
    remark: false,
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
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setModalTakedown: (state, action) => {
      state.modalTakedown = action.payload;
    },
    setModalReqTakedown: (state, action) => {
      state.modalReqTakedown = action.payload;
    },
    setModalDecline: (state, action) => {
      state.modalDecline = action.payload;
    },
    setModalChecked: (state, action) => {
      state.modalChecked = action.payload;
    },
    setModalActive: (state, action) => {
      state.modalActive = action.payload;
    },
    setModalInactive: (state, action) => {
      state.modalInactive = action.payload;
    },
    setModalImage: (state, action) => {
      state.modalImage = action.payload;
    },
    setModalDetail: (state, action) => {
      state.modalDetail = action.payload;
    },
    setTitleImage: (state, action) => {
      state.titleImage = action.payload;
    },
    setSrcImage: (state, action) => {
      state.srcImage = action.payload;
    },
    setDetailProduct: (state, action) => {
      state.detailProduct = action.payload;
    },
    setDetailVariant: (state, action) => {
      state.detailVariant = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
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
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setRemark: (state, action) => {
      state.remark = action.payload;
    },
  },
});

export const {
  setList,
  setLoading,
  setCurrentPage,
  setTotal,
  setTotalPage,
  setSearch,
  setShowDetail,
  setModalTakedown,
  setModalReqTakedown,
  setModalDecline,
  setModalChecked,
  setModalActive,
  setModalInactive,
  setModalImage,
  setModalDetail,
  setSrcImage,
  setTitleImage,
  setDetailProduct,
  setDetailVariant,
  setPostPerPage,
  setId,
  setStartDateFilter,
  setEndDateFilter,
  setStatusFilter,
  setFieldName,
  setOrderBy,
  setCategoryId,
  setRemark
} = reducerSlice.actions;

export default reducerSlice;
