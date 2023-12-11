import axios from "axios";
import GeneralUtility from "../utils/general-utility";
import EncryptDecrypt from "./encrypt-decrypt";
import Endpoint from "./endpoint";
import Cookies from "js-cookie";
import UseAuth from "../pages/auth/Auth";
import RouteName from "./routename";
const BASE_API = process.env.REACT_APP_BASE_API;

export default async function CallApi({ url, method, data }) {
  // get token:
  const token = await GeneralUtility.getToken();
  // get language
  const language = await GeneralUtility.getLanguage();

  const headers = {
    authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept-Language": language,
  };

  const response = await axios({ url, method, data, headers }).catch(
    (err) => err.response
  );

  if (
    response.status === 401 &&
    response.data.message === "You Are Not Authorized"
  ) {
    //Unauthorized or expired token
    const refresh = await refreshToken(url, method, data, headers);
    return refresh;
  } else if (response.status > 300) {
    return handleErrorStatus(response);
  } else {
    const signatureResponse = response
      ? EncryptDecrypt.encSignature(response.request.responseText)
      : "";
    const signature = response.headers["signature"];

    if (signatureResponse !== signature) {
      return UseAuth.logout();
    } else {
      const res = {
        error: false,
        status: response.status,
        message: response.data.message,
        data: response.data,
      };

      return res;
    }
  }
}

function handleErrorStatus(response) {
  let res = {
    error: true,
    status: "",
    message: "",
    data: "",
    error_message: "",
  };

  if (response.status === 400) {
    //bad request
    res = {
      error: true,
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      error_message: response.data.errors,
    };
  } else if (response.status === 403) {
    //bad request
    res = {
      error: true,
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      error_message: response.data.errors,
    };
  } else if (response.status === 500) {
    //internal server error
    res = {
      error: true,
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      error_message: response.data.errors,
    };
  } else {
    res = {
      error: true,
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      error_message: response.data.errors,
    };
  }
  return res;
}

const refreshToken = async (url, method, data, headers) => {
  const refreshToken = await GeneralUtility.getRefreshToken();

  const hit1 = await axios({
    url: BASE_API + Endpoint.refreshToken,
    method: "POST",
    data: { refreshToken: refreshToken },
    headers: headers,
  }).catch((err) => err.response);

  if (hit1.status === 200) {
    Cookies.set(
      "token",
      EncryptDecrypt.enc(hit1.data.data.auth.token, { expires: 3 })
    );
    Cookies.set(
      "refreshToken",
      EncryptDecrypt.enc(hit1.data.data.auth.refreshToken, { expires: 3 })
    );

    headers.authorization = `Bearer ${hit1.data.data.auth.token}`;
    const hitAgain = await axios({
      url: url,
      method: method,
      data: data,
      headers: headers,
    }).catch((err) => err.response);

    if (hitAgain.status === 200) {
      const res = {
        error: false,
        status: hitAgain.status,
        message: hitAgain.data.message,
        data: hitAgain.data,
      };
      return res;
    } else {
      return window.location.reload();
    }
  } else {
    window.location = RouteName.login;
    return UseAuth.logout();
  }
};
