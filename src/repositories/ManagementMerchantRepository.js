import MerchantModel from "../pages/management/model/MerchantModel";
import CallApi from "../services/request-helper";
import Endpoint from "../services/endpoint";

const BASE_API = process.env.REACT_APP_BASE_API;

const getData = async (data) => {
  const url = BASE_API + Endpoint.listMerchant;
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

  let array = [];
  //Look at this
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const item = new MerchantModel({
      id: element.id,
      merchantId: element.merchantId,
      name: element.merchantName,
      location: element.location,
      status: element.status,
      buyback: element.buybackCompatibility,
      rating: element.rating ?? 0
    });
    array.push(item);
  }

  let merchant = {};
  merchant.error = response.error;
  merchant.message = response.message;
  merchant.page = response2 ? response2.page : 0;
  merchant.per_page = response2 ? response2.size : 0;
  merchant.total_data = response2 ? response2.totalData : 0;
  merchant.total_pages = response2 ? response2.totalPage : 0;
  merchant.data = array;

  return merchant;
};

const getDetail = async (data) => {
  const url = BASE_API + Endpoint.detailMerchant;
  const response = await CallApi({ url, method: "POST", data });

  return response;
};

const buybackCompability = async (data) => {
  const url = BASE_API + Endpoint.buybackCompability;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const suspendMerchant = async (data) => {
  const url = BASE_API + Endpoint.suspendMerchant;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const reqSuspendMerchant = async (data) => {
  const url = BASE_API + Endpoint.reqSuspendMerchant;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const unsuspendMerchant = async (data) => {
  const url = BASE_API + Endpoint.unsuspendMerchant;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const editMerchant = async (dat) => {
  const url = BASE_API + Endpoint.editMerchant;
  const response = await CallApi({
    url,
    method: "POST",
    data: dat,
    type: "multipart",
  });
  return response;
};

const ManagementMerchantRepository = {
  getData,
  getDetail,
  buybackCompability,
  suspendMerchant,
  reqSuspendMerchant,
  unsuspendMerchant,
  editMerchant,
};

export default ManagementMerchantRepository;
