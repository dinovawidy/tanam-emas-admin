import { setData, setPage } from "./Reducer";

const getPage = async (store, { page }) => {
  store.dispatch(setPage(page));
};

const getData = async (store, data) => {
  store.dispatch(setData(data));
};

const exportData = async (store, data, { page }) => {
  store.dispatch(setPage(page));
};

const Action = {
  getPage,
  exportData,
  getData,
};

export default Action;
