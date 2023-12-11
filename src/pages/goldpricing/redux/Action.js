import GoldPricingRepository from "../../../repositories/GoldPricingRepository";
import DateUtility from "../../../utils/date-utility";
import GeneralUtility from "../../../utils/general-utility";
import PopupUtility from "../../../utils/popup-utility";
import ChangeLogModel from "../model/ChangeLogModel";
import {
  setChangeLogList,
  setTotalData,
  setCurrentPage,
  setTotalPage,
  setCurrentPrice,
  setLoadingChart,
  setLoadingChangeLog,
  setNewPrice,
  setShowConfirmModal,
  setStartDate,
  setEndDate,
  setGraphicList,
} from "./Reducer";

const getChangeLog = async (dispatch, { page, startDate, endDate }) => {
  dispatch(setLoadingChangeLog(true));
  dispatch(setLoadingChart(true));
  dispatch(setCurrentPage(page));
  dispatch(setStartDate(startDate));
  dispatch(setEndDate(endDate));

  const response = await GoldPricingRepository.getChangeLog({
    starDate: startDate,
    endDate: endDate,
    page: page,
    size: 5,
  });
  if (!response.error) {
    dispatch(setTotalData(response.totalData));
    dispatch(setTotalPage(response.totalPage));
    dispatch(setChangeLogList(response.data));
  } 
  // else {
  //   dispatch(setTotalData(0));
  //   dispatch(setTotalPage(0));
  //   dispatch(setChangeLogList([]));
  // }

  const response2 = await GoldPricingRepository.getChartData({
    starDate: startDate,
    endDate: endDate,
  });
  if (!response2.error) {
    var data = [];
    response2.data.forEach((element) => {
      const datas = ChangeLogModel({
        id: "",
        dateTime: DateUtility.formatDate(element.createdAt, "short"),
        buybackPrice: element.price,
        admin: "",
      });
      data.push(datas);
    });
    dispatch(
      setCurrentPrice({
        currentPrice: response2.gold.price,
        persentage: response2.gold.persentagePrice,
      })
    );
    dispatch(setGraphicList(data));
  } else {
    dispatch(setGraphicList([]));
    dispatch(
      setCurrentPrice({
        currentPrice: 0,
        persentage: 0,
      })
    );
  }
  dispatch(setLoadingChangeLog(false));
  dispatch(setLoadingChart(false));
};

const changeBuybackPrice = async (dispatch, { price }) => {
  dispatch(setNewPrice(price));
};

const changeShowConfirmModal = async (dispatch, { showModal }) => {
  dispatch(setShowConfirmModal(showModal));
};

const handleChange = (value, dispatch) => {
  changeBuybackPrice(dispatch, { price: value });
};

const handlePrice = async (dispatch, { price, page, startDate, endDate }) => {
  let data = {
    price: GeneralUtility.decimalToInt(price),
  };
  const response = await GoldPricingRepository.updatePricing(data);
  if (response.error === false) {
    changeShowConfirmModal(dispatch, { showModal: false });
    PopupUtility.success("Gold Price has been updated");
    getChangeLog(dispatch, { page, startDate, endDate });
    dispatch(setNewPrice(""));
  } else {
    PopupUtility.responseValidate(response.message, response.error_message);
  }
};

const Action = {
  getChangeLog,
  changeBuybackPrice,
  changeShowConfirmModal,
  handlePrice,
  handleChange,
};

export default Action;
