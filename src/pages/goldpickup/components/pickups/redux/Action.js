import GoldPickupRepository from "../../../../../repositories/GoldPickupRepository";
import DateUtility from "../../../../../utils/date-utility";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setCurrentPage,
  setList,
  setItemDetail,
  setLoading,
  setPostPerPage,
  setShowDetail,
  setTotal,
  setTotalPage,
  setEndDateFilter,
  setFieldName,
  setOrderBy,
  setSearch,
  setStartDateFilter,
  setStatusFilter,
} from "./Reducer";

const getData = async (
  dispatch,
  {
    currentPage,
    search,
    postPerPage,
    fieldName,
    orderBy,
    startDateFilter,
    endDateFilter,
    statusFilter,
  }
) => {
  dispatch(setLoading(true));
  dispatch(setCurrentPage(currentPage));
  dispatch(setSearch(search));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setFieldName(fieldName));
  dispatch(setOrderBy(orderBy));
  dispatch(setStartDateFilter(startDateFilter));
  dispatch(setEndDateFilter(endDateFilter));
  dispatch(setStatusFilter(statusFilter));

  let data = {
    page: currentPage,
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

  let response = await GoldPickupRepository.getPickups(data);

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

const validate = (dispatch, values) => {
  const error = {};
  if(values){}
}

const setPage = async (dispatch, pages) => {
  dispatch(setCurrentPage(pages));
  getData(dispatch, { page: pages });
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    let response = await GoldPickupRepository.getDetailGoldPickup({ id: id });
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

const updateStatus = async (dispatch, id, type) => {
  let response;
  // 1 not match, 2 set as received, 3 set as finished
  switch (type) {
    case 1:
      response = await GoldPickupRepository.updateNotMatch({
        id: id,
      });
      break;
    case 2:
      response = await GoldPickupRepository.updateReceived({
        id: id,
      });
      break;
    case 3:
      response = await GoldPickupRepository.updateFinished({
        id: id,
      });
      break;
    default:
      break;
  }

  if (response.error === false) {
    PopupUtility.success("Update status success.");
    getData(dispatch, { currentPage: 0, postPerPage: 5 });
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const Action = {
  getData,
  setPage,
  changeShowDetail,
  updateStatus,
};

export default Action;
