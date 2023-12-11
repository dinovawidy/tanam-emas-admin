import GoldPickupRepository from "../../../../../repositories/GoldPickupRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setCurrentPage,
  setList,
  setLoading,
  setPostPerPage,
  setTotal,
  setTotalPage,
  setSearch,
  setFieldName,
  setOrderBy,
} from "./Reducer";

const getData = async (
  dispatch,
  { page, search, postPerPage, fieldName, orderBy }
) => {
  dispatch(setLoading(true));
  dispatch(setCurrentPage(page));
  dispatch(setSearch(search));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setFieldName(fieldName));
  dispatch(setOrderBy(orderBy));

  let data = {
    page: page,
  };

  if (search) {
    data.search = search;
  } else {
    data.search = "";
  }

  if (postPerPage) {
    data.size = postPerPage;
  } else {
    data.size = 5;
  }

  if (orderBy) {
    data.orderBy = orderBy;
  } else {
    data.orderBy = "";
  }

  if (fieldName) {
    data.fieldName = fieldName;
  } else {
    data.fieldName = "";
  }

  let response = await GoldPickupRepository.getMerchantList(data);
  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotalPage(response.total_page));
    dispatch(setTotal(response.total_data));
  } else {
    PopupUtility.responseValidate("failed", response.message);
    dispatch(setLoading(false));
    dispatch(setList([]));
    dispatch(setTotalPage(0));
    dispatch(setTotal(0));
  }
};

const setPage = async (dispatch, pages) => {
  dispatch(setCurrentPage(pages));
  getData(dispatch, { page: pages });
};

const Action = {
  getData,
  setPage,
};

export default Action;
