import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "operationalMain",
  initialState: {
    loadingData: false,
    list: [],

    dataMonday: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    dataTuesDay: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    dataWednesday: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    dataThursday: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    dataFriday: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    dataSaturday: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    dataSunday: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
    },
    initialData: [
      {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        status: false,
      },
      {
        dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
      },
      {
        dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
      },
      {
        dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
      },
      {
        dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
      },
      {
        dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
      },
      {
        dayOfWeek: "",
      startTime: "",
      endTime: "",
      status: false,
      },
    ],
    edit: false,
  },
  reducers: {
    setLoadingData: (state, action) => {
      state.loadingData = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setDataMonday: (state, action) => {
      state.dataMonday = action.payload;
    },
    setDataTuesday: (state, action) => {
      state.dataTuesDay = action.payload;
    },
    setDataWednesday: (state, action) => {
      state.dataWednesday = action.payload;
    },
    setDataThursday: (state, action) => {
      state.dataThursday = action.payload;
    },
    setDataFriday: (state, action) => {
      state.dataFriday = action.payload;
    },
    setDataSaturday: (state, action) => {
      state.dataSaturday = action.payload;
    },
    setDataSunday: (state, action) => {
      state.dataSunday = action.payload;
    },
    setInitialData: (state, action) => {
      state.initialData = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
  },
});

export const {
  setLoadingData,
  setList,
  setDataMonday,
  setDataTuesday,
  setDataWednesday,
  setDataThursday,
  setDataFriday,
  setDataSaturday,
  setDataSunday,
  setInitialData,
  setEdit,
} = reducerSlice.actions;
export default reducerSlice;
