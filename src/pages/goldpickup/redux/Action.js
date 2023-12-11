import { setPage, setSelectedMerchant } from "./Reducer";

const getPage = async (store, {page}) => {
  store.dispatch(setPage(page));
}
const changeSelectedMerchant = async (store, {item}) => {
  store.dispatch(setSelectedMerchant(item));
}

const Action = {
  getPage,
  changeSelectedMerchant,
}

export default Action;