import MerchantBuybackModel from "../pages/goldpickup/components/merchantBuyback/model/MerchantBuybackModel";
import MerchantListModel from "../pages/goldpickup/components/merchantList/model/MerchantListModel";
import PickupsModel from "../pages/goldpickup/components/pickups/model/PickupsModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";
import DateUtility from "../utils/date-utility";

const BASE_API = process.env.REACT_APP_BASE_API;

const getMerchantList = async (data) => {
  const url = BASE_API + Endpoint.listBuybackMerchant;
  const response = await CallApi({ url, method: "POST", data });
  const res1 = typeof response != "undefined" ? response.data : null;
  const res2 = typeof res1 != "undefined" && res1 != null ? res1.data : null;
  const list = typeof res2 != "undefined" && res2 != null ? res2.content : [];

  let merchantList = [];
  list.forEach((element) => {
    var merchant = new MerchantListModel({
      id: element.id,
      name: element.name,
      location: element.location,
      address: element.address,
      quantity: element.qtyTotal,
      totalWeight: element.weightTotal,
    });
    merchantList.push(merchant);
  });

  let datas = {};
  datas.error = response.error;
  datas.message = response.message;
  datas.page = res2 ? res2.page : 0;
  datas.per_page = res2 ? res2.size : 0;
  datas.total_data = res2 ? res2.totalData : 0;
  datas.total_page = res2 ? res2.totalPage : 0;
  datas.data = merchantList;

  return datas;
};

const getPickups = async (data) => {
  const url = BASE_API + Endpoint.listGoldPickup;
  const response = await CallApi({ url, method: "POST", data });
  const res1 = typeof response != "undefined" ? response.data : null;
  const res2 = typeof res1 != "undefined" && res1 != null ? res1.data : null;
  const list = typeof res2 != "undefined" && res2 != null ? res2.content : [];

  let merchantList = [];
  if(list && Array.isArray(list)) {
    list.forEach((element) => {
      var merchant = new PickupsModel({
        pickupDate: element.dateCreated,
        id: element.id,
        ticketId: element.titckeId,
        name: element.merchantName,
        quantity: element.quantity,
        pickupMethod: element.pickupMethod,
        status: element.status,
      });
      merchantList.push(merchant);
    });
  } else {
    list.forEach(() => {
      var merchant = new PickupsModel({
        pickupDate: "",
        id: "",
        ticketId: "",
        name: "",
        quantity: "",
        pickupMethod: "",
        status: "",
      });
      merchantList.push(merchant);
    });
  }

  let datas = {};
  datas.error = response.error;
  datas.message = response.message;
 
  datas.page = res2 !== null ? res2.page : 0;
  datas.per_page = res2 !== null ? res2.size : 0;
  datas.total_data = res2 !== null ? res2.totalData : 0;
  datas.total_page = res2 !== null ? res2.totalPage : 0;
  datas.data = merchantList;

  return datas;
};

const getMerchantBuyback = async (data) => {
  const url = BASE_API + Endpoint.listBuybackMerchantById;
  const response = await CallApi({ url, method: "POST", data });
  const res1 = typeof response != "undefined" ? response.data : null;
  const res2 = typeof res1 != "undefined" && res1 != null ? res1.data : null;
  const list =
    typeof res2 != "undefined" && res2 != null ? res2.content.listBuyBack : [];

  let merchantList = [];
  list.forEach((element) => {
    var merchant = new MerchantBuybackModel({
      dateCreated: DateUtility.formatDate(element.dateCreated, "half"),
      id: element.id,
      titcketId: element.titckeId,
      totalWeight: element.weight,
      quantity: element.quantity,
      totalPrice: element.totalPrice,
    });
    merchantList.push(merchant);
  });

  let datas = {};
  datas.error = response.error;
  datas.message = response.message;
  datas.page = res2.page;
  datas.per_page = res2.size;
  datas.total_data = res2.totalData;
  datas.total_page = res2.totalPage;
  datas.total_weight = res2.content.totalQuantity;
  datas.total_quantity = res2.content.totalWeight;
  datas.data = merchantList;

  return datas;
};

const getDetailGoldPickup = async (data) => {
  const url = BASE_API + Endpoint.detailGoldPickup;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const updateNotMatch = async (data) => {
  const url = BASE_API + Endpoint.goldPickupNotMatch;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const updateReceived = async (data) => {
  const url = BASE_API + Endpoint.goldPickupReceived;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const updateFinished = async (data) => {
  const url = BASE_API + Endpoint.goldPickupFinish;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getTicket = async () => {
  const url = BASE_API + Endpoint.goldPickupTicket;
  const response = await CallApi({ url, method: "GET" });
  return response;
};

const submitRequest = async (data) => {
  const url = BASE_API + Endpoint.goldPickupReq;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const GoldPickupRepository = {
  getMerchantList,
  getPickups,
  getMerchantBuyback,
  getDetailGoldPickup,
  updateNotMatch,
  updateReceived,
  updateFinished,
  getTicket,
  submitRequest,
};

export default GoldPickupRepository;
