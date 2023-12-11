import Cookies from "js-cookie";
import EncryptDecrypt from "../services/encrypt-decrypt";

const getToken = async () => {
  let getToken = Cookies.get("token");
  let token = getToken !== undefined ? EncryptDecrypt.dec(getToken) : null;
  return token;
};

const getRefreshToken = async () => {
  let getToken = Cookies.get("refreshToken");
  let refreshToken =
    getToken !== undefined ? EncryptDecrypt.dec(getToken) : null;
  return refreshToken;
};

const getLanguage = async () => {
  let language = Cookies.get("language") ?? "EN";
  return language.toUpperCase();
};

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

const addSeparator = (num) => {
  if (num) {
    return addCommas(removeNonNumeric(num));
  }
};

const decimalToInt = (num) => {
  if (num) {
    return parseFloat(num.replace(/,/g, ""));
  }
};

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const GeneralUtility = {
  getToken,
  getRefreshToken,
  getLanguage,
  addSeparator,
  addCommas,
  dataURLtoFile,
  decimalToInt,
  removeNonNumeric,
};

export default GeneralUtility;
