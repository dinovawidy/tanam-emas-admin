import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "holidayDate",
  initialState: {
    loadingData: false,
    showForm: false,
    month: 0,
    year: 0,
    eventsFirst: [],
    eventsSecond: [],
    updateHoliday: {},
    eventName: "",
    startDate: {},
    endDate: {},
    status: 0,
  },
  reducers: {
    setLoadingData: (state, action) => {
      state.loadingData = action.payload;
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setEventsFirst: (state, action) => {
      state.eventsFirst = action.payload;
    },
    setEventsSecond: (state, action) => {
      state.eventsSecond = action.payload;
    },
    setUpdateHoliday: (state, action) => {
      state.updateHoliday = action.payload;
    },
    setEventName: (state, action) => {
      state.eventName = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },

  },
});

export const {
  setLoadingData,
  setShowForm,
  setMonth,
  setYear,
  setEventsFirst,
  setEventsSecond,
  setUpdateHoliday,
  setEventName,
  setStartDate,
  setEndDate,
  setStatus,
} = reducerSlice.actions;
export default reducerSlice;
