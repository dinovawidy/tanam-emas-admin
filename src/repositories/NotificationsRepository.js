import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getAllNotif = async (data) => {
  const url = BASE_API + Endpoint.getAllNotif;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const markRead = async (data) => {
  const url = BASE_API + Endpoint.readNotif;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const readAll = async () => {
  const url = BASE_API + Endpoint.readAllNotif;
  const response = await CallApi({ url, method: "POST" });
  return response;
};

const getUnreadNotif = async () => {
  const url = BASE_API + Endpoint.countNotif;
  const response = await CallApi({ url, method: "POST" });
  return response;
};

const NotificationsRepository = {
  getAllNotif,
  readAll,
  getUnreadNotif,
  markRead,
};

export default NotificationsRepository;
