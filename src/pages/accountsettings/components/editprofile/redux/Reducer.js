import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "editprofile",
  initialState: {
    // page: "editprofile",
    validateStatus: false,
    validatePass: false,
    popuppassword: false,
    cookie: false,
    editProfile: {
      name: "",
      photo: "",
      adminId: "",
      level: "",
      role: "",
      email: "",
      countryCodeId: "",
      phoneNumber: "",
      // dialCode: "",
    },
    pass: "",
    data: {},
    edit: {
      name: false,
      photo: false,
      phoneNumber: false,
      email: false,
    },
    errorEditProfile: {},
    codephone: [],
  },
  reducers: {
    // setPage: (state, action) => {
    //   state.page = action.payload;
    // },
    setEditProfile: (state, action) => {
      state.editProfile = action.payload;
    },
    setErrorEditProfile: (state, action) => {
      state.errorEditProfile = action.payload;
    },
    setValidateStatus: (state, action) => {
      state.validateStatus = action.payload;
    },
    setValidatePass: (state, action) => {
      state.validatePass = action.payload;
    },
    setPopuppassword: (state, action) => {
      state.popuppassword = action.payload;
    },
    setCookie: (state, action) => {
      state.cookie = action.payload;
    },
    setCodePhone: (state, action) => {
      state.codephone = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setPass: (state, action) => {
      state.pass = action.payload;
    },
    
  },
});

export const {
  setEditProfile,
  setErrorEditProfile,
  setValidateStatus,
  setValidatePass,
  setPopuppassword,
  setCookie,
  setCodePhone,
  setData,
  setEdit,
  setPass,
} = reducerSlice.actions;

export default reducerSlice;
