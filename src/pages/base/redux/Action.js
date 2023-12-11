import Cookies from "js-cookie";
import { setBreadcrums, setTranslation } from "./Reducer";

const getBreadcrums = async (dispatch, title, link) => {
  let breadcrums = [];
  let data = {};
  data.title = title;
  data.link = link;
  breadcrums.push(data);
  dispatch(setBreadcrums(breadcrums));
};

const changeTranslation = async (dispatch, lang) => {
  dispatch(setTranslation(lang));
  Cookies.set("Language", lang);
};

const Action = { getBreadcrums, changeTranslation };

export default Action;
