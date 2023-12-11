import CustomerModel from "../pages/management/model/CustomerModel";
import RemarksModel from "../pages/management/model/RemarksModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getList = async (data) => {
  const url = BASE_API + Endpoint.listCustomer;
  const response = await CallApi({ url, method: "POST", data });
  const res1 = typeof response != "undefined" ? response.data : null;
  const res2 = typeof res1 != "undefined" && res1 != null ? res1.data : null;
  const list = typeof res2 != "undefined" && res2 != null ? res2.content : [];

  let customer = [];
  list.forEach((element) => {
    var buku = new CustomerModel({
      id: element.customerId,
      name: element.customerName,
      email: element.email,
      status: element.status,
    });
    customer.push(buku);
  });

  let customerData = {};
  customerData.error = response.error;
  customerData.message = response.message;
  customerData.page = res2 ? res2.page : 0;
  customerData.per_page = res2 ? res2.size : 0;
  customerData.total_data = res2 ? res2.totalData : 0;
  customerData.total_page = res2 ? res2.totalPage : 0;
  customerData.data = customer;

  return customerData;
};

const getDetail = async (data) => {
  const url = BASE_API + Endpoint.detailCustomer;
  const response = await CallApi({ url, method: "POST", data });
  const res1 = typeof response != "undefined" ? response.data : null;
  const res2 = typeof res1 != "undefined" && res1 != null ? res1.data : {};

  let customerDetail = {};
  customerDetail.error = response.error;
  customerDetail.message = response.message;
  customerDetail.data = res2 ?? {};

  return customerDetail;
};

const suspendCustomer = async (data) => {
  const url = BASE_API + Endpoint.suspendCustomer;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const unsuspendCustomer = async (data) => {
  const url = BASE_API + Endpoint.unsuspendCustomer;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const reqsuspendCustomer = async (data) => {
  const url = BASE_API + Endpoint.reqsuspendCustomer;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const ManagementCustomerRepository = {
  getList,
  getDetail,
  suspendCustomer,
  unsuspendCustomer,
  reqsuspendCustomer,
};

export default ManagementCustomerRepository;
