import BuybackRepository from "../../../../../repositories/BuybackRepository";
import DateUtility from "../../../../../utils/date-utility";
import GeneralUtility from "../../../../../utils/general-utility";
import PopupUtility from "../../../../../utils/popup-utility";

import {
  setCurrentPage,
  setEndDateFilter,
  setFieldName,
  setItemDetail,
  setList,
  setLoading,
  setOrderBy,
  setPostPerPage,
  setSearch,
  setShowDetail,
  setStartDateFilter,
  setStatusFilter,
  setTotal,
  setTotalPage,
  setTotalQuantity,
  setTotalTransaction,
  setTotalWeight,
} from "./Reducer";

const getList = async (
  dispatch,
  {
    page,
    search,
    statusFilter,
    postPerPage,
    startDateFilter,
    endDateFilter,
    fieldName,
    orderBy,
  }
) => {
  dispatch(setLoading(true));
  dispatch(setCurrentPage(page));
  dispatch(setSearch(search));
  dispatch(setStatusFilter(statusFilter));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setStartDateFilter(startDateFilter));
  dispatch(setEndDateFilter(endDateFilter));
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

  if (startDateFilter) {
    data.startDate = DateUtility.dateFormatApi(startDateFilter);
  } else {
    data.startDate = "";
  }

  if (endDateFilter) {
    data.endDate = DateUtility.dateFormatApi(endDateFilter);
  } else {
    data.endDate = "";
  }

  if (statusFilter) {
    data.status = statusFilter;
  } else {
    data.status = "";
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

  let response = await BuybackRepository.getData(data);

  if (!response.error) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotal(response.total));
    dispatch(setTotalPage(response.total_pages));
    dispatch(setTotalWeight( GeneralUtility.addCommas(response.totalWeight) + "grams"));
    dispatch(setTotalQuantity(response.totalQuantity));
    dispatch(setTotalTransaction(response.totalTransaction));
  } 
  else {
    dispatch(setLoading(false));
    dispatch(setList([]));
    dispatch(setTotal(0));
    dispatch(setTotalPage(0));
    dispatch(setTotalWeight(0 + "grams"));
    dispatch(setTotalQuantity(0));
    dispatch(setTotalTransaction(0));
  }
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    let response = await BuybackRepository.getDetail({ id: id });
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

// const updateStatus = async (dispatch, id) => {
//   const response = await BuybackRepository.updateStatus({ id: id, status: 2 });
//   if (response.error === false) {
//     PopupUtility.success("A buyback has been successfully completed.");
//     getList(dispatch, { page: 0, postPerPage: 5 });
//     dispatch(setShowDetail(false));
//     dispatch(setItemDetail({}));
//   } else {
//     PopupUtility.responseValidate("Failed", response.message);
//   }
// };

const Action = {
  getList,
  changeShowDetail,
  // updateStatus,
};

export default Action;
