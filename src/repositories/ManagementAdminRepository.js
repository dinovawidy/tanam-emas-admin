import AdminModel from "../pages/management/model/AdminModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getAdmin = async (data) => {
  const url = BASE_API + Endpoint.listAdmin;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;
  const list =
    typeof response2 != "undefined" && response2 != null ? response2.data : [];

  let admin = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const item = new AdminModel({
      id: element.id,
      adminId: element.adminId,
      name: element.adminName,
      level: element.level,
      role: element.role,
      status: element.status,
    });
    admin.push(item);
  }

  let dataAdmin = {};
  dataAdmin.error = response.error;
  dataAdmin.message = response.message;
  dataAdmin.page = response2 ? response2.page : 0;
  dataAdmin.per_page = response2 ? response2.size : 0;
  dataAdmin.total_data = response2 ? response2.totalData : 0;
  dataAdmin.total_pages = response2 ? response2.totalPage : 0;
  dataAdmin.data = admin;

  return dataAdmin;
};

const detailAdmin = async (data) => {
  const url = BASE_API + Endpoint.detailAdmin;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const changeStatusAdmin = async (data) => {
  const url = BASE_API + Endpoint.changeStatusAdmin;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getLevelAdmin = async () => {
  const url = BASE_API + Endpoint.levelAdmin;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];
  return data2;
};

const getRoleAdmin = async (dat) => {
  const url = BASE_API + Endpoint.roleAdmin;
  const response = await CallApi({ url, method: "POST", data: dat });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null ? response1.data : [];
  return response2;
};

const generateAdminId = async () => {
  const url = BASE_API + Endpoint.generateAdminId;
  const response = await CallApi({ url, method: "POST" });
  return response;
};

const createAdmin = async (data) => {
  const url = BASE_API + Endpoint.createAdmin;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const editAdmin = async (data) => {
  const url = BASE_API + Endpoint.updateAdmin;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const ManagementAdminRepository = {
  getAdmin,
  detailAdmin,
  changeStatusAdmin,
  getRoleAdmin,
  getLevelAdmin,
  generateAdminId,
  createAdmin,
  editAdmin,
};

export default ManagementAdminRepository;
