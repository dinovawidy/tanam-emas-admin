import CustomerModel from "../pages/helpcenter/model/CustomerModel";
import MerchantModel from "../pages/helpcenter/model/MerchantModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";
import DateUtility from "../utils/date-utility";

const BASE_API = process.env.REACT_APP_BASE_API;

const getCustomer = async (data) => {
  const url = BASE_API + Endpoint.listFeedbackCustomer;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;

  const list =
    typeof response2 != "undefined" && response2 != null ? response2.data : [];

  let customer = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const item = new CustomerModel({
      id: element.id,
      issuedDate: DateUtility.formatDate(element.issuedDate, "full"),
      feedbackId: element.feedbackId,
      category: element.category,
      topic: element.topic,
      status: element.status,
      statusName: element.statusName,
    });
    customer.push(item);
  }

  //mapping to object
  let dataCustomer = {};
  dataCustomer.error = response.error;
  dataCustomer.message = response.message;
  dataCustomer.page = response2 ? response2.page : 0;
  dataCustomer.per_page = response2 ? response2.size : 0;
  dataCustomer.total_pages = response2 ? response2.totalPage : 0;
  dataCustomer.total_data = response2 ? response2.totalData : 0;
  dataCustomer.data = customer;

  return dataCustomer;
};

const getDetail = async (data) => {
  const url = BASE_API + Endpoint.detailFeedback;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const changeStatusFeedback = async (data) => {
  const url = BASE_API + Endpoint.changeStatusFeedback;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getMerchant = async (data) => {
  const url = BASE_API + Endpoint.listFeedbackMerchant;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 =
    typeof response1 != "undefined" && response1 != null
      ? response1.data
      : null;

  const list =
    typeof response2 != "undefined" && response2 != null ? response2.data : [];

  let merchant = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const item = new CustomerModel({
      id: element.id,
      issuedDate: DateUtility.formatDate(element.issuedDate, "full"),
      feedbackId: element.feedbackId,
      category: element.category,
      topic: element.topic,
      status: element.status,
      statusName: element.statusName,
    });
    merchant.push(item);
  }

  //mapping to object
  let dataMerchant = {};
  dataMerchant.error = response.error;
  dataMerchant.message = response.message;
  dataMerchant.page = response2 ? response2.page : 0;
  dataMerchant.per_page = response2 ? response2.size : 0;
  dataMerchant.total_pages = response2 ? response2.totalPage : 0;
  dataMerchant.total_data = response2 ? response2.totalData :0;
  dataMerchant.data = merchant;

  return dataMerchant;
};

const HelpCenterRepository = {
  getCustomer,
  getDetail,
  changeStatusFeedback,
  getMerchant,
};

export default HelpCenterRepository;
