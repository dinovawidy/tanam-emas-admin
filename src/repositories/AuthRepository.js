import Cookies from "js-cookie";
import EncryptDecrypt from "../services/encrypt-decrypt";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getAuth = async (dat) => {
  const url = BASE_API + Endpoint.login;
  const response = await CallApi({ url, method: "POST", data: dat });
  return response;
};

const getEmail = async (data) => {
  const url = BASE_API + Endpoint.forgotPassword;
  const response = await CallApi({
    url,
    method: "POST",
    data: { email: data.email },
  });
  return response;
};

const resetPassword = async (data) => {
  const url = BASE_API + Endpoint.resetPassword;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const refreshToken = async () => {
  const getToken = Cookies.get("refreshToken");
  const refreshToken =
    getToken !== undefined ? EncryptDecrypt.dec(getToken) : null;
  const url = BASE_API + Endpoint.refreshToken;
  const response = await CallApi({
    url,
    method: "POST",
    data: { refreshToken: refreshToken },
  });

  const data = {
    error: response.error,
    message: response.message,
    token: response.data.data.auth.token,
    refreshToken: response.data.data.auth.refreshToken,
  };

  return data;
};

const AuthRepository = {
  getAuth,
  getEmail,
  resetPassword,
  refreshToken,
};

export default AuthRepository;
