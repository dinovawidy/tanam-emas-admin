import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "changepassword",
  initialState: {
    showCurrent: false,
    showNew: false,
    showConfirm: false,
    editPass: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    errorEditPass: {},
    canSave: false,
  },
  reducers: {
    setEditPass: (state, action) => {
      state.editPass = action.payload;
    },
    setShowCurrent: (state, action) => {
      state.showCurrent = action.payload;
    },
    setShowNew: (state, action) => {
      state.showNew = action.payload;
    },
    setShowConfirm: (state, action) => {
      state.showConfirm = action.payload;
    },
    setErrorEditPass: (state, action) => {
      state.errorEditPass = action.payload;
    },
    setCanSave: (state, action) => {
      state.canSave = action.payload;
    },
  },
});

export const {
  setEditPass,
  setShowCurrent,
  setShowNew,
  setShowConfirm,
  setErrorEditPass,
  setCanSave,
} = reducerSlice.actions;

export default reducerSlice;
