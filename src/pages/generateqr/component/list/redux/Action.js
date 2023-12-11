import QRCodeRepository from "../../../../../repositories/QRCodeRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setList,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotal,
  setTotalPage,
  setSearch,
  setShowDetail,
  setItemDetail,
  setFieldName,
  setOrderBy,
} from "./Reducer";

const getList = async (
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
    data.orderBy = "desc";
  }

  if (fieldName) {
    data.fieldName = fieldName;
  } else {
    data.fieldName = "createdBy";
  }

  let response = await QRCodeRepository.getList(data);
  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotal(response.total_data));
    dispatch(setTotalPage(response.total_pages));
  } else {
    PopupUtility.responseValidate("failed", response.message);
    dispatch(setLoading(false));
    dispatch(setList([]));
    dispatch(setTotal(0));
    dispatch(setTotalPage(0));
  }
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    let response = await QRCodeRepository.getDetail({ serialNumber: id });
    if (response.error === false) {
      dispatch(setItemDetail(response.data.data));
    } else {
      PopupUtility.responseValidate("failed", response.message);
      dispatch(setItemDetail({}));
    }
  } else {
    dispatch(setItemDetail({}));
  }
  dispatch(setShowDetail(showDetail));
};

const Action = {
  getList,
  changeShowDetail,
};

export default Action;
