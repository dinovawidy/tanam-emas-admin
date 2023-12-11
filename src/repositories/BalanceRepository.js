import BalanceListModel from "../pages/balance/models/BalanceListModel";
import BalanceModel from "../pages/balance/models/BalanceModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getBalance = async () => {
  const url = BASE_API + Endpoint.getBalance;
  const response = await CallApi({ url, method: "POST" });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;

  let data = new BalanceModel({
    price: response ? response2.balance : 0,
  });
  return data;
};

const getBalanceHistory = async (data) => {
  const url = BASE_API + Endpoint.balanceHistory;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;
  const list =
    typeof response2 != "undefined" && response2 != null
      ? response2.balanceHistories
      : [];

  const listBalance = [];
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    console.log(element.type);
    const item = new BalanceListModel({
      invoiceNumber: element.invoiceNumber,
      dateTime: element.dateTime,
      commission: element.commission,
      applicationServiceFee: element.applicationServiceFee,
      cancellationFee: element.cancellationFee,
      withdrawalStatus: element.withdrawalStatus,
      withdrawalAmount: element.withdrawalAmount,
      withdrawalFee: element.withdrawalFee,
      type: element.type,
      total: element.total,
      merchantId: element.merchantId,
      merchantName: element.merchantName,
      noResi: element.noResi,
      shippingCost: element.shippingCost,
      shippingInsurance: element.shippingInsurance,
    });
    listBalance.push(item);
  }

  let dataBalance = {};

  dataBalance.error = response.error;
  dataBalance.message = response.message;
  dataBalance.page = response2 ? response2.page : 0;
  dataBalance.per_page = response2 ? response2.size : 0;
  dataBalance.total_data = response2 ? response2.totalSize : 0;
  dataBalance.total_pages = response2 ? response2.totalPage : 0;
  dataBalance.data = listBalance;

  return dataBalance;
};

const getInquiry = async () => {
  const url = BASE_API + Endpoint.inquiry;
  const response = await CallApi({ url, method: "POST" });
  const res = response.data.data;

  let data = new BalanceModel({
    bankName: res.bankName,
    accountNumber: res.accountNumber,
    accountName: res.accountName,
    balance: res.balance,
    withdrawalFee: res.withdrawalFee,
    total: res.total,
  });
  return data;
};

const postWd = async (data) => {
  const url = BASE_API + Endpoint.withdraw;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const canWithdraw = async () => {
  const url = BASE_API + Endpoint.canWithdraw;
  const response = await CallApi({ url, method: "POST" });
  return response;
};

const BalanceRepository = {
  getBalance,
  getBalanceHistory,
  getInquiry,
  postWd,
  canWithdraw,
};

export default BalanceRepository;
