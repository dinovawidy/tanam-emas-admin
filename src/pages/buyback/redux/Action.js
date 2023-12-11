import { setPage } from "./Reducer";

const getPage = async (store, {page}) => {
  store.dispatch(setPage(page));
}

const Action = {
  getPage,
}

export default Action;