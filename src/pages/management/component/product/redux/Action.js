import ManagementProductRepository from "../../../../../repositories/ManagementProductRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import ProductModel from "../../../model/ProductModel";
import {
  setCurrentPage,
  setList,
  setLoading,
  setModalTakedown,
  setModalDecline,
  setModalReqTakedown,
  setShowDetail,
  setModalChecked,
  setModalActive,
  setModalInactive,
  setTotal,
  setTotalPage,
  setModalImage,
  setModalDetail,
  setTitleImage,
  setSrcImage,
  setDetailProduct,
  setDetailVariant,
  setSearch,
  setPostPerPage,
  setStartDateFilter,
  setEndDateFilter,
  setStatusFilter,
  setFieldName,
  setOrderBy,
  setCategoryId,
} from "./Reducer";
import DateUtility from "../../../../../utils/date-utility";

const getList = async (
  dispatch,
  { currentPage, search, postPerPage, startDateFilter, endDateFilter, statusFilter, fieldName, orderBy, categoryId }
) => {
  dispatch(setLoading(true));
  dispatch(setSearch(search));
  dispatch(setStatusFilter(statusFilter));
  dispatch(setStartDateFilter(startDateFilter));
  dispatch(setEndDateFilter(endDateFilter));
  dispatch(setCurrentPage(currentPage));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setFieldName(fieldName));
  dispatch(setOrderBy(orderBy));
  dispatch(setCategoryId(categoryId));

  let params = {
    page: currentPage,
  };

  if (search) {
    params.search = search;
  } else {
    params.search = "";
  }

  if (startDateFilter) {
    params.startDate = DateUtility.dateFormatApi(startDateFilter);
  } else {
    params.startDate = "";
  }

  if (endDateFilter) {
    params.endDate = DateUtility.dateFormatApi(endDateFilter);
  } else {
    params.endDate = "";
  }

  if (statusFilter) {
    params.status = statusFilter;
  } else {
    params.status = "";
  }

  if (postPerPage) {
    params.size = postPerPage;
  } else {
    params.size = 5;
  }

  if (orderBy) {
    params.orderBy = orderBy;
  } else {
    params.orderBy = "";
  }

  if (fieldName) {
    params.fieldName = fieldName;
  } else {
    params.fieldName = "";
  }

  if(categoryId) {
    params.categoryId = categoryId;
  } else {
    params.categoryId = "";
  }

  let response = await ManagementProductRepository.getProduct(params);
  response = response.data;
  let data = [];

  for (let i = 0; i < response.content.length; i++) {
    const element = response.content[i];
    const date = new Date(element.uploadDate);
    const dateFormat =
      date.toLocaleDateString("en", { month: "short" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    data.push(
      new ProductModel({
        id: element.productId,
        product_category: element.category.name,
        name_jewelry: element.name,
        brand_name: element.brandName,
        status: element.status,
        merchant_name: element.merchantName,
        sales_count: element.salesCount,
        upload_date: dateFormat,
        edition_name: element.edition,
        weight: element.weight,
        subCategoryName: element.subCategoryName,
      })
    );
  }
  if (!response.error) {
    dispatch(setLoading(false));
    dispatch(setList(data));
    dispatch(setTotal(response.totalData));
    dispatch(setTotalPage(response.totalPage));
  } else {
    dispatch(setLoading(true));
    dispatch(setList([]));
    dispatch(setTotal(0));
    dispatch(setTotalPage(0));
  }
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    let response = await ManagementProductRepository.getDetailProduct({
      id: id,
    });
    if (response.error === false) {
      let detail = { ...response.data.data };
      detail.remark = response.data.data.remarkHistory;
      dispatch(setDetailProduct(detail));
    } else {
      //PopupUtility.responseValidate("Failed", response.message);
      dispatch(setDetailProduct({}));
    }
  } else {
    dispatch(setDetailProduct({}));
  }
  dispatch(setShowDetail(showDetail));
};

const changeModalTakedown = async (dispatch, { showModal }) => {
  dispatch(setModalTakedown(showModal));
};

const changeModalReqTakedown = async (dispatch, { showModal }) => {
  dispatch(setModalReqTakedown(showModal));
};

const changeModalDecline = async (dispatch, { showModal }) => {
  dispatch(setModalDecline(showModal));
};

const changeModalChecked = async (dispatch, { showModal }) => {
  dispatch(setModalChecked(showModal));
};

const changeModalActive = async (dispatch, { showModal }) => {
  dispatch(setModalActive(showModal));
};

const changeModalInactive = async (dispatch, { showModal }) => {
  dispatch(setModalInactive(showModal));
};

const changeModalImage = async (dispatch, { showModal, title, img }) => {
  dispatch(setModalImage(showModal));
  dispatch(setTitleImage(title));
  dispatch(setSrcImage(img));
};

const changeModalDetail = async (dispatch, {showModal}) => {
  dispatch(setModalDetail(showModal))
}

const handleSubmitMarkaschecked = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    remarks: remarks,
    status: 2,
  };

  let response = await ManagementProductRepository.changeStatusProduct(data);

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalChecked(""));
  } else {
    PopupUtility.responseValidate("Error", response.message);
  }
};

const handleSubmitInactive = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    status: 0, //inactive
    remarks: remarks,
  };

  let response = await ManagementProductRepository.changeStatusProduct(data);
  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalInactive(""));
  } else {
    PopupUtility.responseValidate("error", response.message);
  }
};
const handleSubmitTakedown = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    status: -2, // take down
    remarks: remarks,
  };

  let response = await ManagementProductRepository.changeStatusProduct(data);
  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalTakedown(""));
    //getDetailProduct(dispatch, {});
  } else {
    PopupUtility.responseValidate("Error", response.message);
  }
};

const handleSubmitReqTakedown = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    status: -1, // req take down
    remarks: remarks,
  };

  let response = await ManagementProductRepository.changeStatusProduct(data);
  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalReqTakedown(""));
    //getDetailProduct(dispatch, {});
  } else {
    PopupUtility.responseValidate("error", response.message);
  }
};

const handleSubmitDecline = async (dispatch, { id, remarks }) => {
  let data = {
    id: id,
    status: 1, // decline
    remarks: remarks,
  };

  let response = await ManagementProductRepository.changeStatusProduct(data);
  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalDecline(""));
  } else {
    PopupUtility.responseValidate("error", response.message);
  }
};

const getVariantDetails = async (dispatch) => {
  const response = await ManagementProductRepository.getVariantDetails();
  const data = response.data;
  dispatch(setDetailVariant(data))
  
  if(response) {
    dispatch(setLoading(false))
    dispatch(setDetailVariant(data))
  }
}

const Action = {
  getList,
  changeShowDetail,
  changeModalTakedown,
  changeModalReqTakedown,
  changeModalDecline,
  changeModalChecked,
  changeModalActive,
  changeModalInactive,
  handleSubmitTakedown,
  handleSubmitReqTakedown,
  handleSubmitDecline,
  handleSubmitMarkaschecked,
  handleSubmitInactive,
  changeModalImage,
  changeModalDetail,
  getVariantDetails,
};

export default Action;
