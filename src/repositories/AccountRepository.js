import PhoneModel from "../pages/accountsettings/model/PhoneModel";
import BankModel from "../pages/accountsettings/model/BankModel";
import AddressModel from "../pages/management/model/AddressModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;
const BASE_PENTEST = process.env.REACT_APP_PENTEST;

const getAccountProfile = async () => {
  const url = BASE_API + Endpoint.accountProfile;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];
  return data2;
};

// ini fungsi untuk mendapatkan code phone
const getCodePhone = async () => {
  const url = BASE_API + Endpoint.codePhone;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];

  let array = [];
  data2.forEach((element) => {
    var phone = new PhoneModel({
      value: element.id,
      label: element.dialCode,
      code: element.code,
      image: element.image,
      name: element.name,
    });
    array.push(phone);
  });
  return array;
};

const updateAccountProfile = async (dat) => {
  const url = BASE_API + Endpoint.updateAccountProfile;
  const response = await CallApi({
    url,
    method: "POST",
    data: dat,
    type: "multipart",
  });
  return response;
};

const changePassword = async (data) => {
  const url = BASE_API + Endpoint.changePassword;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const checkPass = async (dat) => {
  const url = BASE_API + Endpoint.checkPass;
  const response = await CallApi({ url, method: "POST", data: dat });
  return response;
};

const getProvince = async () => {
  const url = BASE_API + Endpoint.province;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];

  let array = [];
  data2.forEach((element) => {
    var province = new AddressModel({
      value: element.id,
      label: element.name,
    });
    array.push(province);
  });
  return array;
};

const getCity = async (dat) => {
  const url = BASE_API + Endpoint.city;
  const response = await CallApi({ url, method: "POST", data: dat });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];

  let array = [];
  data2.forEach((element) => {
    var city = new AddressModel({
      value: element.id,
      label: element.name,
      name: element.alias,
    });
    array.push(city);
  });
  return array;
};

const getDistrict = async (dat) => {
  const url = BASE_API + Endpoint.district;
  const response = await CallApi({ url, method: "POST", data: dat });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];

  let array = [];
  data2.forEach((element) => {
    var districts = new AddressModel({
      value: element.id,
      label: element.name,
      name: element.alias,
    });
    array.push(districts);
  });
  return array;
};

const getBank = async () => {
  const url = BASE_API + Endpoint.getListBank;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];
  let array = [];
  data2.forEach((element) => {
    var bank = new BankModel({
      value: element.id,
      label: element.name,
    });
    array.push(bank);
  });
  return array;
};

const getBankDetails = async () => {
  const url = BASE_API + Endpoint.getBankDetail;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];
  return data2;
};

const updateBankDetails = async (dat) => {
  const url = BASE_API + Endpoint.editBankAdmin;
  const response = await CallApi({ url, method: "POST", data: dat });
  return response;
};

const contactUs = async () => {
  const url = BASE_API + "/api/v1/public/aboutus";
  const response = await CallApi({ url, method: "POST" });
  return response;
};

const submitComplaint = async (data) => {
  const url = BASE_API + "/api/v1/public/contact-us";
  const response = await CallApi({ url, method: "POST", data: data });
  return response;
};

const AccountRepository = {
  getAccountProfile,
  getCodePhone,
  updateAccountProfile,
  changePassword,
  checkPass,
  getCity,
  getDistrict,
  getProvince,
  getBank,
  getBankDetails,
  updateBankDetails,
  contactUs,
  submitComplaint,
};

export default AccountRepository;
