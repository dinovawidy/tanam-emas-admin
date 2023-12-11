import ManagementCustomerRepository from "../../../../../repositories/ManagementCustomerRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import RemarksModel from "../../../model/RemarksModel";
import {
  setCurrentPage,
  setList,
  setLoading,
  setPostPerPage,
  setShowDetail,
  setModalImage,
  setTotalPage,
  setModal,
  setModalStatus,
  setSearch,
  setStatusFilter,
  setFieldName,
  setItemDetail,
  setOrderBy,
  setTotalData,
} from "./Reducer";

const getList = async (
  dispatch,
  { currentPage, search, statusFilter, postPerPage, fieldName, orderBy }
) => {
  dispatch(setLoading(true));
  dispatch(setCurrentPage(currentPage));
  dispatch(setSearch(search));
  dispatch(setStatusFilter(statusFilter));
  dispatch(setPostPerPage(postPerPage));
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

  let response = await ManagementCustomerRepository.getList(data);

  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotalPage(response.total_page));
    dispatch(setTotalData(response.total_data));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
    dispatch(setLoading(false));
    dispatch(setList([]));
    dispatch(setTotalPage(0));
    dispatch(setTotalData(0));
  }
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    let response = await ManagementCustomerRepository.getDetail({ id: id });
    if (response.error === false) {
      let data = response.data;

      let customer = [];
      data.remarkHistory.forEach((element) => {
        let remark = new RemarksModel({
          id: element.id,
          date: element.date,
          remark: element.remark,
          type: element.type,
          writer: element.writer,
        });
        customer.push(remark);
      });

      data.remark = customer;
      dispatch(setItemDetail(data));
    } else {
      PopupUtility.responseValidate("Failed", response.message);
      dispatch(setItemDetail({}));
    }
  } else {
    dispatch(setItemDetail({}));
  }
  dispatch(setShowDetail(showDetail));
};

const changeModal = async (dispatch, status, { showModal }) => {
  dispatch(setModalStatus(status));
  dispatch(setModal(showModal));
};

const handleSubmit = async (dispatch, status, { remarks, id }) => {
  let response;
  if (status === "0") {
    response = await ManagementCustomerRepository.suspendCustomer({
      id: id,
      remarks: remarks,
    });
  } else if (status === "1") {
    response = await ManagementCustomerRepository.reqsuspendCustomer({
      id: id,
      remarks: remarks,
    });
  } else if (status === "-1") {
    response = await ManagementCustomerRepository.unsuspendCustomer({
      id: id,
      remarks: remarks,
    });
  }

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
  dispatch(setShowDetail(false));
  dispatch(setItemDetail({}));
};

const changeModalImage = async (dispatch, { showModal }) => {
  dispatch(setModalImage(showModal));
};

const Action = {
  getList,
  changeShowDetail,
  changeModal,
  handleSubmit,
  changeModalImage,
};

export default Action;
