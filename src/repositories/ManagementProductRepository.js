import ProductModel from "../pages/management/model/ProductModel";
import Endpoint from "../services/endpoint";
import CallApi from "../services/request-helper";

const BASE_API = process.env.REACT_APP_BASE_API;

const getProduct = async (dat) => {
  const url = BASE_API + Endpoint.listProduct;
  const response = await CallApi({ url, method: "POST", data: dat });
  const data = typeof response != "undefined" ? response.data : null;
  return data;
};

const getDetailProduct = async (data) => {
  const url = BASE_API + Endpoint.detailProduct;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const changeStatusProduct = async (dat) => {
  const url = BASE_API + Endpoint.changeStatusProduct;
  const response = await CallApi({ url, method: "POST", data: dat });
  const data = typeof response != "undefined" ? response.data : null;
  return data;
};

const getVariantDetails = async () => {
  let data = [
    new ProductModel({
      photo: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
      size: "11cm",
      color: "gold",
      stock: "10",
      normal_price: "1000234",
      promotion_price: "",
      weight: "2.1g"
    }),
    new ProductModel({
      photo: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
      size: "5cm",
      color: "silver",
      stock: "3",
      normal_price: "500234",
      promotion_price: "50000",
      weight: "1.1g"
    }),
    new ProductModel({
      photo: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
      size: "12cm",
      color: "rose gold",
      stock: "20",
      normal_price: "5000000",
      promotion_price: "4500000",
      weight: "0.4g"
    }),
    new ProductModel({
      photo: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
      size: "19cm",
      color: "black",
      stock: "7",
      normal_price: "3600000",
      promotion_price: "3400000",
      weight: "3.1g"
    }),
    new ProductModel({
      photo: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
      size: "17cm",
      color: "blue",
      stock: "5",
      normal_price: "1000234",
      promotion_price: "30000",
      weight: "2.1g"
    }),
  ]

  let list = {}
  list.data = data;
  return list;
}

const ManagementProductRepository = {
  getProduct,
  changeStatusProduct,
  getDetailProduct,
  getVariantDetails,
};

export default ManagementProductRepository;
