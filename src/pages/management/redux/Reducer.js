import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "management",
  initialState: {
    page: "merchant",
    showModalAdmin: false,
    showModalMerchant: false,
    levelAdmin: [],
    roleAdmin: [],
    generateAdminId: "",
    addForm: {},
    errorAddForm: {},
    validate: false,
    totalReqMerchant: 0,
    disabled: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setShowModalAdmin: (state, action) => {
      state.showModalAdmin = action.payload;
    },
    setShowModalMerchant: (state, action) => {
      state.showModalMerchant = action.payload;
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
    setTotalReqMerchant: (state, action) => {
      state.totalReqMerchant = action.payload;
    },
    setDisabled: (state, action) => {
      state.disabled = action.payload;
    },
  },
});

export const {
  setPage,
  setShowModalAdmin,
  setShowModalMerchant,
  setLevelAdmin,
  setRoleAdmin,
  setGenerateAdminId,
  setAddForm,
  setErrorAddForm,
  setValidate,
  setTotalReqMerchant,
  setDisabled,
} = reducerSlice.actions;

export default reducerSlice;
