import CallApi from "../services/request-helper";
import Endpoint from "../services/endpoint";
import QRModel from "../pages/generateqr/component/list/models/QRModel";
import GeneralUtility from "../utils/general-utility";

const BASE_API = process.env.REACT_APP_BASE_API;

const getList = async (data) => {
  const url = BASE_API + Endpoint.listQR;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = response !== "undefined" ? response.data : null;
  const response2 =
    typeof response1 !== "undefined" && response1 != null
      ? response1.data
      : null;
  const list =
    typeof response2 != "undefined" && response2 != null ? response2.data : [];

  let qr = [];
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    let item = new QRModel({
      id: element.id,
      serialNumber: element.serialNumber,
      productName:
        element.brandName +
        " - " +
        (element.edition !== "" ? element.edition : "") +
        ", " +
        element.grams.name,
      fineness: element.fineness,
    });
    qr.push(item);
  }
  let dataQrCode = {};
  dataQrCode.error = response.error;
  dataQrCode.message = response.message;
  dataQrCode.page = response2 ? response2.page : 0;
  dataQrCode.total_data = response2 ? response2.totalData : 0;
  dataQrCode.total_pages = response2 ? response2.totalPage : 0;
  dataQrCode.data = qr;

  return dataQrCode;
};

const getDetail = async (data) => {
  const url = BASE_API + Endpoint.detailQR;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const createNew = async (data) => {
  let form = new FormData();
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.productPhoto1) {
      form.append(
        "payload[" + i + "].images",
        GeneralUtility.dataURLtoFile(item.productPhoto1, item.namePhoto1),
        item.namePhoto1
      );
    }

    if (item.productPhoto2) {
      form.append(
        "payload[" + i + "].images",
        GeneralUtility.dataURLtoFile(item.productPhoto2, item.namePhoto2),
        item.namePhoto2
      );
    }

    form.append("payload[" + i + "].SNICode", item.serialNumber);
    form.append("payload[" + i + "].brandName", item.brandName);
    form.append("payload[" + i + "].edition", item.edition);
    form.append("payload[" + i + "].gramsId", item.gramId);
    form.append("payload[" + i + "].quantity", item.quantity);
  }
  const url = BASE_API + Endpoint.exportQR;
  const response = await CallApi({ url, method: "POST", data: form });
  return response;
};

const deleteItem = async (data) => {
  const url = BASE_API + Endpoint.deleteQR;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getGram = async () => {
  const url = BASE_API + Endpoint.productGram;
  const response = await CallApi({ url, method: "POST" });
  return response;
};

const QRCodeRepository = { getList, createNew, deleteItem, getDetail, getGram };

export default QRCodeRepository;
