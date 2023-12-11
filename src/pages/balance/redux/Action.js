import BalanceRepository from "../../../repositories/BalanceRepository";
import DateUtility from "../../../utils/date-utility";
import PopupUtility from "../../../utils/popup-utility";
import { setData, setList, setPopup, setInquiry, setCanWithdraw } from "./Reducer";

const getBalance = async (dispatch) => {
  let response = await BalanceRepository.getBalance();
  if(!response.error) {
    dispatch(setData(response.price));
  }
};

const getHistory = async (dispatch, { startDateFilter, endDateFilter, page, size }) => {
  let payload = {
    page: 0,
    size: 200,
  };

  if (startDateFilter) {
    const formatDate = DateUtility.dateFormatApi(startDateFilter);
    let dateObj = new Date(formatDate);
    const unixDate = dateObj.getTime();
    payload.startDate = unixDate;
  } else {
    payload.startDate = "";
  }

  if (endDateFilter) {
    const formatDate = DateUtility.dateFormatApi(endDateFilter);
    let dateObj = new Date(formatDate);
    const unixDate = dateObj.getTime();
    payload.endDate = unixDate;
  } else {
    payload.endDate = "";
  }

  let response = await BalanceRepository.getBalanceHistory(payload);

  if (!response.error) {
    const res = response.data;
    dispatch(setList(res));
  }
};


const inquiry = async (dispatch) => {
  const response = await BalanceRepository.getInquiry();
  if(!response.error) {
    dispatch(setInquiry(response))
  }

}


const postWd = async (dispatch) => {
  // let payload = { ...data };
  // delete payload.bankDetail;
  // delete payload.name;
  // delete payload.totalPrice;
  let response = await BalanceRepository.postWd();
  dispatch(setPopup(false));
  if (!response.error) {
    getHistory(dispatch, { startDateFilter: "", endDateFilter: "" });
    PopupUtility.success("Success");
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const canWithdraw = async (dispatch) => {
  const response = await BalanceRepository.canWithdraw();
  const data = response.data.data;
  if(!response.error) {
    dispatch(setCanWithdraw(data))
  }
}

const Action = {
  getBalance,
  getHistory,
  postWd,
  inquiry,
  canWithdraw,
};

export default Action;
