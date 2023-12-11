import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "BankDetails",
  initialState: {
    validateStatus: false,
    validatePass: false,
    bankDetails: {
      bankName: "",
      bankId: "",
      bankNumber: "",
    },
    data: {},
    edit: false,
    errorBankDetails: {},
    bank: {},
    canSave: false,
    show: false,
    pass: "",
  },
  reducers: {
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
    },
    setErrorBankDetails: (state, action) => {
      state.errorBankDetails = action.payload;
    },
    setValidateStatus: (state, action) => {
      state.validateStatus = action.payload;
    },
    setValidatePass: (state, action) => {
      state.validatePass = action.payload;
    },
    setBank: (state, action) => {
      state.bank = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setCanSave: (state, action) => {
      state.canSave = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setPass: (state, action) => {
      state.pass = action.payload;
    },
  },
});

export const {
  setBankDetails,
  setErrorBankDetails,
  setValidateStatus,
  setValidatePass,
  setBank,
  setData,
  setEdit,
  setCanSave,
  setShow,
  setPass,
} = reducerSlice.actions;

export default reducerSlice;
