import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "merchant",
  initialState: {
    list: [],
    id: {},
    addForm: {},
    addError: {},
    validate: false,
    loading: true,
    cancel: false,
    currentPage: 0,
    postPerPage: 5,
    totalPage: 0,
    totalData: 0,
    search: "",
    showDetail: false,
    modalImage: false,
    modalEdit: false,
    modal: false,
    modalStatus: "",
    buybackCompability: false,
    titleImage: "",
    srcImage: "",
    statusFilter: "",
    fieldName: "",
    orderBy: "",
    detailMerchant: {},
    data: {},
    city: [],
    codephone: [],
    province: [],
    district: [],
    totalReqMerchant: 0,
    loadingButton : false,
    remark: false,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
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
    setTotalData: (state, action) => {
      state.totalData = action.payload;
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
    setModalImage: (state, action) => {
      state.modalImage = action.payload;
    },
    setModalEdit: (state, action) => {
      state.modalEdit = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
    setbuybackCompability: (state, action) => {
      state.buybackCompability = action.payload;
    },
    setTitleImage: (state, action) => {
      state.titleImage = action.payload;
    },
    setSrcImage: (state, action) => {
      state.srcImage = action.payload;
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
    setDetailMerchant: (state, action) => {
      state.detailMerchant = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
    },
    setCodephone: (state, action) => {
      state.codephone = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
    setTotalReqMerchant: (state, action) => {
      state.totalReqMerchant = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoadingButton: (state, action) => {
      state.loadingButton = action.payload;
    },
    setRemark: (state, action) => {
      state.remark = action.payload;
    },
  },
});

export const {
  setList,
  setId,
  setAddForm,
  setAddError,
  setValidate,
  setCancel,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotalData,
  setTotalPage,
  setSearch,
  setShowDetail,
  setModalImage,
  setModalEdit,
  setModal,
  setModalStatus,
  setbuybackCompability,
  setTitleImage,
  setSrcImage,
  setStatusFilter,
  setFieldName,
  setOrderBy,
  setDetailMerchant,
  setCity,
  setProvince,
  setCodephone,
  setDistrict,
  setTotalReqMerchant,
  setData,
  setLoadingButton,
  setRemark,
} = reducerSlice.actions;

export default reducerSlice;
