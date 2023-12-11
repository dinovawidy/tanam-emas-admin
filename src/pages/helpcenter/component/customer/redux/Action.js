import HelpCenterRepository from "../../../../../repositories/HelpCenterRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setCurrentPage,
  setList,
  setDetailCustomer,
  setLoading,
  setModalReqResolved,
  setModalResolved,
  setModalSendEmail,
  setPostPerPage,
  setShowDetail,
  setTotalData,
  setSearch,
  setFieldName,
  setOrderBy,
  setType,
  setTotalPage,
} from "./Reducer";

const getList = async (
  dispatch,
  { currentPage, postPerPage, search, statusFilter, type, fieldName, orderBy }
) => {
  dispatch(setLoading(true));
  dispatch(setCurrentPage(currentPage));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setSearch(search));
  dispatch(setType(type));
  dispatch(setFieldName(fieldName));
  dispatch(setOrderBy(orderBy));

  let data = {
    page: currentPage,
  };

  if (search) {
    data.search = search;
  } else {
    data.search = "";
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

  if (type) {
    data.type = "customer";
  } else {
    data.type = "customer";
  }

  if (fieldName) {
    data.fieldName = fieldName;
  } else {
    data.fieldName = "";
  }

  if (orderBy) {
    data.orderBy = orderBy;
  } else {
    data.orderBy = "";
  }

  let response = await HelpCenterRepository.getCustomer(data);

  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotalData(response.total_data));
    dispatch(setTotalPage(response.total_pages));
  } else {
    dispatch(setLoading(true));
    dispatch(setList([]));
    dispatch(setTotalData(0));
    dispatch(setTotalPage(0));
  }
};

const setPage = async (dispatch, pages) => {
  dispatch(setCurrentPage(pages));
  getList(dispatch, { page: pages });
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    const response = await HelpCenterRepository.getDetail({ id: id });
    const resDetail = response.data.data;

    if (response.error === false) {
      dispatch(setDetailCustomer(resDetail));
    } else {
      dispatch(setDetailCustomer({}));
    }
  } else {
    dispatch(setDetailCustomer({}));
  }
  dispatch(setShowDetail(showDetail));
};

const changeModalResolved = async (dispatch, { showModal }) => {
  dispatch(setModalResolved(showModal));
};

const changeModalReqResolved = async (dispatch, { showModal }) => {
  dispatch(setModalReqResolved(showModal));
};

const changeModalSendEmail = async (dispatch, { showModal }) => {
  dispatch(setModalSendEmail(showModal));
};

const handleSubmitResolved = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    remarks: remarks,
    identifier: "setasresolved-customer-helpcenter-button",
  };
  let response = await HelpCenterRepository.changeStatusFeedback(data);

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 1, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalResolved(""));
  }
};

const handleSubmitReqResolved = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    remarks: remarks,
    identifier: "reqresolve-customer-helpcenter-button",
  };
  let response = await HelpCenterRepository.changeStatusFeedback(data);

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 1, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalReqResolved(""));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};


const Action = {
  getList,
  setPage,
  changeShowDetail,
  changeModalResolved,
  changeModalReqResolved,
  changeModalSendEmail,
  handleSubmitResolved,
  handleSubmitReqResolved,
};

export default Action;
