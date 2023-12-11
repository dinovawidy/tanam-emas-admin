import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "requestmerchant",
  initialState: {
    list: [],
    detailMerchant: {},
    addForm: {},
    addError: {},
    validate: false,
    loading: true,
    cancel: false,
    currentPage: 0,
    postPerPage: 5,
    total: 0,
    totalPage: 0,
    search: "",
    showDetail: false,
    modalEdit: false,
    modalApprove: false,
    modalReqApprove: false,
    modalDecline: false,
    modalImage: false,
    titleImage: "",
    srcImage: "",
    fieldName: "",
    orderBy: "",
    city: [],
    codePhone: [],
    province: [],
    district: [],
    loadingBtn: false,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setAddForm: (state, action) => {
      state.addForm = action.payload;
    },
    setAddError: (state, action) => {
      state.addError = action.payload;
    },
    setValidate: (state, action) => {
      state.validate = action.payload;
    },
    setCancel: (state, action) => {
      state.cancel = action.payload;
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
    setModalEdit: (state, action) => {
      state.modalEdit = action.payload;
    },
    setModalApprove: (state, action) => {
      state.modalApprove = action.payload;
    },
    setModalReqApprove: (state, action) => {
      state.modalReqApprove = action.payload;
    },
    setModalDecline: (state, action) => {
      state.modalDecline = action.payload;
    },
    setModalImage: (state, action) => {
      state.modalImage = action.payload;
    },
    setTitleImage: (state, action) => {
      state.titleImage = action.payload;
    },
    setSrcImage: (state, action) => {
      state.srcImage = action.payload;
    },
    setDetailMerchant: (state, action) => {
      state.detailMerchant = action.payload;
    },
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCodePhone: (state, action) => {
      state.codePhone = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
    setLoadingBtn: (state, action) => {
      state.loadingBtn = action.payload;
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
  setShowDetail,
  setModalEdit,
  setModalApprove,
  setModalReqApprove,
  setModalDecline,
  setModalImage,
  setSrcImage,
  setTitleImage,
  setDetailMerchant,
  setFieldName,
  setOrderBy,
  setCity,
  setCodePhone,
  setProvince,
  setDistrict,
  setAddForm,
  setAddError,
  setValidate,
  setCancel,
  setLoadingBtn,
} = reducerSlice.actions;

export default reducerSlice;
