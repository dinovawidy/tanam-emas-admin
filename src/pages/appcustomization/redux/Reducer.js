import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "appcustomization",
  initialState: {
    list: [],
    buyback: [],
    addForm: {},
    loadingButton: false,
  },

  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setBuyback: (state, action) => {
      state.buyback = action.payload;
    },
    setAddForm: (state, action) => {
      state.addForm = action.payload;
    },
    setLoadingButton: (state, action) => {
      state.loadingButton = action.payload;
    },
  },
});

export const { setList, setBuyback, setAddForm , setLoadingButton} = reducerSlice.actions;

export default reducerSlice;
