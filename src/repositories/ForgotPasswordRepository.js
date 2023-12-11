import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getEmail = async (data) => {
    const url = BASE_API + Endpoint.forgotPassword;
    const response = await CallApi({ url, method: "POST", data });
    return response;
}

const forgotPasswordRepository = {
    getEmail,
}

export default forgotPasswordRepository;