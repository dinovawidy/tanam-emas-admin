import GoldPickupRepository from "../../../../../repositories/GoldPickupRepository";
import DateUtility from "../../../../../utils/date-utility";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setCurrentPage,
  setList,
  setLoading,
  setPostPerPage,
  setShowDetail,
  setTotal,
  setTotalPage,
  setTicketList,
  setTotalWeight,
  setTotalQuantity,
  setTotalPrice,
  setShowModal,
  setSelectedPickupMethod,
  setSelectedPickupDate,
  setRemarks,
  setStartDateFilter,
  setEndDateFilter,
  setFieldName,
  setOrderBy,
  setSearch,
  setStatusFilter,
  setIdList,
  setTicketId,
  setErrorPickUp,
  setDetailTotalWeight,
  setDetailTotalQuantity,
} from "./Reducer";

const getData = async (
  dispatch,
  {
    id,
    page,
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
  dispatch(setCurrentPage(page));
  dispatch(setSearch(search));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setFieldName(fieldName));
  dispatch(setOrderBy(orderBy));
  dispatch(setStartDateFilter(startDateFilter));
  dispatch(setEndDateFilter(endDateFilter));
  dispatch(setStatusFilter(statusFilter));

  let data = {
    merchantId: id,
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
    data.statusFilter = statusFilter;
  } else {
    data.statusFilter = "";
  }

  let response = await GoldPickupRepository.getMerchantBuyback(data);

  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotalPage(response.total_page));
    dispatch(setTotal(response.total_data));
    dispatch(setDetailTotalWeight(response.total_weight));
    dispatch(setDetailTotalQuantity(response.total_quantity));
  } 
  else {
    PopupUtility.responseValidate("failed", response.message);
    dispatch(setLoading(false));
    dispatch(setList([]));
    dispatch(setTotalPage(0));
    dispatch(setTotal(0));
    dispatch(setTotalWeight(0));
    dispatch(setTotalQuantity(0));
  }
};

const setPage = async (dispatch, pages) => {
  dispatch(setCurrentPage(pages));
  getData(dispatch, { page: pages });
};

const changeTicketList = async (
  dispatch,
  { items, idList, totalWeight, totalQuantity, totalPrice }
) => {
  dispatch(setTicketList(items));
  dispatch(setIdList(idList));
  dispatch(setTotalWeight(totalWeight));
  dispatch(setTotalQuantity(totalQuantity));
  dispatch(setTotalPrice(totalPrice));
  if (items.length > 0) {
    dispatch(setShowDetail(true));
  } else {
    dispatch(setShowDetail(false));
  }
};

const changeShowModal = async (dispatch, { showModal }) => {
  dispatch(setShowModal(showModal));
  if (showModal) {
    const response = await GoldPickupRepository.getTicket();
    if (response.error === false) {
      dispatch(setTicketId(response.data.data.ticketID));
    } else {
      PopupUtility.responseValidate("failed", response.message);
      dispatch(setShowModal(false));
    }
  }
};

const validate = (dispatch, values) => {
  const errors = {};
  let d0 = new Date(values.pickupDate);
  d0.setHours(0, 0, 0, 0);
  let dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  if (!values.pickupMethod) {
    errors.pickupMethod = "pickupMethod must be selected";
  }
  if (!values.pickupDate) {
    errors.pickupDate = "pickupDate must be selected";
  } else if (d0 < dateNow) {
    errors.pickupDate = "The Pick-up Date cannot be in the past";
  }

  if (!values.remarks) {
    errors.remarks = "remarks must be field";
  }

  dispatch(setErrorPickUp(errors));
  return errors;
};

// const handleValidation = async (dispatch, {ticketId,
//   merchantId,
//   weightTotal,
//   quantity,
//   pickupMethod,
//   pickupDate,
//   remarks,
//   buybackId,}
//   ) => {

// }
const changePickupMethod = async (dispatch, { pickupMethod }) => {
  dispatch(setSelectedPickupMethod(pickupMethod));
};

const changePickupDate = async (dispatch, { pickupDate }) => {
  dispatch(setSelectedPickupDate(pickupDate));
};

const changeRemarks = async (dispatch, { remarks }) => {
  dispatch(setRemarks(remarks));
};

const submitRequest = async (
  dispatch,
  {
    ticketId,
    merchantId,
    weightTotal,
    quantity,
    pickupMethod,
    pickupDate,
    remarks,
    buybackId,
  }
) => {
  let data = {
    ticketId: ticketId,
    merchantId: merchantId,
    weightTotal: weightTotal,
    quantity: quantity,
    pickupMethod: pickupMethod,
    pickupDate: DateUtility.dateFormatApi(pickupDate),
    remarks: remarks,
    buybackId: buybackId,
  };
  let response = await GoldPickupRepository.submitRequest(data);

  if (response.error === false) {
    PopupUtility.success("Successfully request gold pickup");
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

const Action = {
  getData,
  setPage,
  changeTicketList,
  changeShowModal,
  changePickupMethod,
  changePickupDate,
  changeRemarks,
  submitRequest,
  validate,
  // handleValidation,
};

export default Action;
