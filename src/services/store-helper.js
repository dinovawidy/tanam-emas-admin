import { configureStore } from "@reduxjs/toolkit";

const generateStoreState = (reducer) => {
  const store = configureStore({
    reducer: reducer,
  });
  return store;
};

const StoreHelper = {
  generateStoreState,
};

export default StoreHelper;
