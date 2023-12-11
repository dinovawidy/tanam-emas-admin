import BuybackModel from "../pages/buyback/components/buybackMain/models/BuybackModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";
import DateUtility from "../utils/date-utility";
const BASE_API = process.env.REACT_APP_BASE_API;

const getData = async (data) => {
  const url = BASE_API + Endpoint.listBuyback;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 = typeof response1 != "undefined" && response1 != null ? response1.data : null;
  const list = typeof response2 != "undefined" && response2 != null ? response2.content : [];

  let array = [];

  if(list && list.listBuyBack && Array.isArray(list.listBuyBack)) {
    for (let i = 0; i < list.listBuyBack.length; i++) {
      const element = list.listBuyBack[i];
      const item = new BuybackModel({
        id: element.id,
        date_created: DateUtility.formatDate(element.dateCreated, "half"),
        category: element.category,
        ticket_id: element.titckeId,
        customer_name: element.customerName,
        weight: element.weight + " gram",
        total_price: element.totalPrice,
        status: element.status,
      });
      array.push(item);
    }
  } else {
    const item = new BuybackModel({
      id: "",
      date_created: "",
      ticket_id: "",
      customer_name: "",
      weight: "",
      total_price: "",
      status: "",
    });
    array.push(item);
  }

  let buyback = {};
  buyback.error = response.error;
  buyback.message = response.message;
  buyback.page = response2 ? response2.page : 0;
  buyback.per_page = response2 ? response2.size : 0;
  buyback.total = response2 ? response2.totalData : 0;
  buyback.total_pages = response2 ? response2.totalPage : 0;
  buyback.totalQuantity = list ? list.totalQuantity : 0;
  buyback.totalTransaction = list ? list.totalTransaction: 0;
  buyback.totalWeight = list ? list.totalWeight : 0;
  buyback.data = array;

  return buyback;
};

const getDetail = async (data) => {
  const url = BASE_API + Endpoint.detailBuyback;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const updateStatus = async (data) => {
  const url = BASE_API + Endpoint.statusBuyback;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const operationalHour = async () => {
  const url = BASE_API + Endpoint.operationalHour;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];
  return data2;
};

const BuybackRepository = {
  getData,
  getDetail,
  updateStatus,
  operationalHour,
};

export default BuybackRepository;
