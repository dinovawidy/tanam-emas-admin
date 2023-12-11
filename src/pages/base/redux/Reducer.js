import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "base",
  initialState: {
    breadcrums: [],
    translation: "en",
  },
  reducers: {
    setBreadcrums: (state, action) => {
      state.breadcrums = action.payload;
    },
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
  },
});

export const { setBreadcrums, setTranslation } = reducerSlice.actions;
export default reducerSlice;
