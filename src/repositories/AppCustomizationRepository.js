import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getAppCustomization = async () => {
    const url = BASE_API + Endpoint.listCustomization;
    const response = await CallApi({ url, method: "POST" });
    const response1 = typeof response != "undefined" ? response.data : null;
    const response2 = typeof response1 != "undefined" && response1 != null ? response1.data : [];
    return response2

}

const updateBanner = async (dat) => {
    const url = BASE_API + Endpoint.saveCustomization;
    const response = await CallApi({ url, method: "POST", data: dat, type: "multipart", });
    return response;
}

const AppCustomizationRepository = {
    getAppCustomization,
    updateBanner,
};

export default AppCustomizationRepository;
