import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "admin",
  initialState: {
    list: [],
    loading: true,
    currentPage: 0,
    postPerPage: 5,
    totalData: 0,
    totalPage: 0,
    search: "",
    statusFilter: "",
    fieldName: "",
    orderBy: "",
    modalStatus: "",
    showModalAdmin: false,
    showDetail: false,
    modalEdit: false,
    modalTerminate: false,
    modalDeactive: false,
    modalActive: false,
    disabled: false,
    detailAdmin: {},
    levelAdmin: [],
    roleAdmin: [],
    generateAdminId: "",
    addForm: {
    },
    errorAddForm: {},
    validate: false,
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
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setModalEdit: (state, action) => {
      state.modalEdit = action.payload;
    },
    setModalTerminate: (state, action) => {
      state.modalTerminate = action.payload;
    },
    setModalDeactive: (state, action) => {
      state.modalDeactive = action.payload;
    },
    setModalActive: (state, action) => {
      state.modalActive = action.payload;
    },
    setDetailAdmin: (state, action) => {
      state.detailAdmin = action.payload;
    },
    setShowModalAdmin: (state, action) => {
      state.showModalAdmin = action.payload;
    },
    setLevelAdmin: (state, action) => {
      state.levelAdmin = action.payload;
    },
    setRoleAdmin: (state, action) => {
      state.roleAdmin = action.payload;
    },
    setGenerateAdminId: (state, action) => {
      state.generateAdminId = action.payload;
    },
    setAddForm: (state, action) => {
      state.addForm = action.payload;
    },
    setErrorAddForm: (state, action) => {
      state.errorAddForm = action.payload;
    },
    setValidate: (state, action) => {
      state.validate = action.payload;
    },
    setDisabled: (state, action) => {
      state.disabled = action.payload;
    },
  },
});

export const {
  setList,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotalData,
  setTotalPage,
  setSearch,
  setStatusFilter,
  setFieldName,
  setOrderBy,
  setModalStatus,
  setShowDetail,
  setModalEdit,
  setModalTerminate,
  setModalDeactive,
  setModalActive,
  setDetailAdmin,
  setShowModalAdmin,
  setLevelAdmin,
  setRoleAdmin,
  setGenerateAdminId,
  setAddForm,
  setErrorAddForm,
  setValidate,
  setDisabled,
  
} = reducerSlice.actions;

export default reducerSlice;
