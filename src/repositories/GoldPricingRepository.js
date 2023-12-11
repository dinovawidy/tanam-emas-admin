import ChangeLogModel from "../pages/goldpricing/model/ChangeLogModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";
const BASE_API = process.env.REACT_APP_BASE_API;

const updatePricing = async (data) => {
  const url = BASE_API + Endpoint.editPrice;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getChangeLog = async (data) => {
  const url = BASE_API + Endpoint.listGoldPrice;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;
  const list =
    typeof response2 != "undefined" && response2 != null
      ? response2.content
      : [];

  let changeLog = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const date = new Date(element.createdAt);
    const dateFormat =
      date.toLocaleDateString("en", { month: "short" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    const item = new ChangeLogModel({
      id: element.id,
      dateTime: dateFormat,
      buybackPrice: element.price,
      admin: element.createdBy,
    });
    changeLog.push(item);
  }

  let changeLogData = {};

  changeLogData.error = response.error;
  changeLogData.message = response.message;
  changeLogData.page = response2 ? response2.page : 0;
  changeLogData.size = response2 ? response2.size : 0;
  changeLogData.totalData = response2 ? response2.totalData : 0;
  changeLogData.totalPage = response2 ? response2.totalPage : 0;
  changeLogData.data = changeLog;

  return changeLogData;
};

const getChartData = async (data) => {
  const url = BASE_API + Endpoint.goldGraphic;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;

  let chartData = {};
  chartData.error = response.error;
  chartData.message = response.message;
  chartData.data = response2 ? response2.data : 0;
  chartData.gold = response2 ? response2.gold : 0;

  return chartData;
};

const GoldPricingRepository = {
  updatePricing,
  getChangeLog,
  getChartData,
};

export default GoldPricingRepository;
