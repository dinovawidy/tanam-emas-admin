import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getBuyback = async (data) => {
  const url = BASE_API + Endpoint.dashboardBuybackSubmitted;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getBuybackConfirmed = async (data) => {
  const url = BASE_API + Endpoint.dashboardBuybackConfirmed;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getBuybackDeclined = async (data) => {
  const url = BASE_API + Endpoint.dashboardBuybackDeclined;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getRevenue = async (data) => {
  const url = BASE_API + Endpoint.dashboardRevenue;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getTopSelling = async (data) => {
  const url = BASE_API + Endpoint.dashboardTopSelling;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getLeaderBoard = async (data) => {
  const url = BASE_API + Endpoint.dashboardLeaderboard;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const exportExcel = async (data) => {
  const url = BASE_API + Endpoint.dashboardExportExcel;
  const response = await CallApi({ url, method: "POST", data });
  return response;
}

const DashboardRepository = {
  getBuyback,
  getBuybackConfirmed,
  getBuybackDeclined,
  getRevenue,
  getTopSelling,
  getLeaderBoard,
  exportExcel,
};

export default DashboardRepository;
