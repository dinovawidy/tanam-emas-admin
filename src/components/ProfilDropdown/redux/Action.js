import BalanceRepository from "../../../repositories/BalanceRepository";
import { setShowDropdown, setData } from "./Reducer";

const changeShowNotif = async (store, { show }) => {
  store.dispatch(setShowDropdown(show));
};

const getBalance = async (dispatch) => {
  const response = await BalanceRepository.getBalance();
  if(!response.error) {
    dispatch(setData(response.price))
  }
}

const Action = {
  changeShowNotif,
  getBalance,
};

export default Action;
