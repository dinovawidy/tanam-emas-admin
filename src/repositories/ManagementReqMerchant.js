import ReqMerchantModel from "../pages/management/model/ReqMerchantModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";
import DateUtility from "../utils/date-utility";

const BASE_API = process.env.REACT_APP_BASE_API;

const getMerchantReq = async (data) => {
  const url = BASE_API + Endpoint.listMerchantRequest;
  const response = await CallApi({ url, method: "POST", data });
  const response1 = typeof response != "undefined" ? response.data : null;
  const response2 = typeof response1 != "undefined" && response1 != null ? response1.data : null;
  const list = typeof response2 != "undefined" && response2 != null ? response2.content : [];

  let reqMerchant = [];

  for(let i = 0; i < list.length; i++) {
    const element = list[i];
     const item = new ReqMerchantModel({
      id: element.id,
        merchantName: element.name,
        merchantPhoto: element.photo,
        email: element.user.email,
        phoneNumber: element.phoneNumber,
        countryCode_id: element.countryCode.id,
        countryCode_dialCode: element.countryCode.dialCode,
        countryCode_code: element.countryCode.code,
        countryCode_image: element.countryCode.image,
        countryCode_name: element.countryCode.name,
        provinces_id:element.provinces.id,
        provinces_name: element.provinces.name,
        cities_id: element.cities.id,
        cities_name: element.cities.name,
        districts_id: element.districts.id,
        districts_name: element.districts.name,
        districts_alias: element.districts.alias,
        address: element.address,
        bankName: element.bankName,
        bankNumber: element.bankNumber,
        postalCode: element.postalCode,
        nik: element.ktpNik,
        nib: element.merchantNib,
        npwp: element.npwpNumber,
        ktpFile: element.ktpFile,
        npwpFile: element.npwpFile,
        reqDate: DateUtility.formatDate(element.createdAt, "half"),
        status: element.statusAccount,
        remarks: element.remarks,
    });
    reqMerchant.push(item);
  }

  let dataReqMerchant = {};
  dataReqMerchant.error = response.error;
  dataReqMerchant.message = response.message;
  dataReqMerchant.page = response2 ? response2.page : 0;
  dataReqMerchant.per_page = response2 ? response2.size : 0;
  dataReqMerchant.total =  response2 ? response2.totalData : 0;
  dataReqMerchant.total_pages = response2 ? response2.totalPage : 0;
  dataReqMerchant.data = reqMerchant;
  
  return dataReqMerchant;
};

const postRequestApproval = async (dat) => {
  const url = BASE_API + Endpoint.reqMerchantApproval;
  const response = await CallApi({ url, method: "POST", data: dat });
  const data = typeof response != "undefined" ? response.data : null;
  return data;
};

const ManagementReqMerchantRepository = {
  getMerchantReq,
  postRequestApproval,
};

export default ManagementReqMerchantRepository;
