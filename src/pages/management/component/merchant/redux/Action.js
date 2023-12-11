import AccountRepository from "../../../../../repositories/AccountRepository";
import ManagementMerchantRepository from "../../../../../repositories/ManagementMerchantRepository";
import GeneralUtility from "../../../../../utils/general-utility";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setList,
  setAddForm,
  setAddError,
  setValidate,
  setCancel,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setShowDetail,
  setTotalData,
  setTotalPage,
  setSearch,
  setModalImage,
  setModalEdit,
  setModal,
  setModalStatus,
  setbuybackCompability,
  setTitleImage,
  setSrcImage,
  setStatusFilter,
  setFieldName,
  setOrderBy,
  setDetailMerchant,
  setCity,
  setCodephone,
  setProvince,
  setDistrict,
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
  let response = await ManagementMerchantRepository.getData(data);

  if (!response.error) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotalPage(response.total_pages));
    dispatch(setTotalData(response.total_data));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
    dispatch(setLoading(false));
    dispatch(setList([]));
    dispatch(setTotalPage(0));
    dispatch(setTotalData(0));
  }
};

const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

const validate = (dispatch, values, detailMerchant) => {
  const errors = {};
  //name, email, countryCodeId, phoneNumber, address, provincesId, citiesId, districtsId, postalCode
  if (!values.name && !detailMerchant.merchantName) {
    errors.name = "Name is required!";
  }
  if (!values.email && !detailMerchant.email) {
    errors.email = "Email is required!";
  }
  if (values.email && !validateEmail(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.phoneNumber && !detailMerchant.phoneNumber) {
    errors.phoneNumber = "Phone Number is required!";
  }
  if (!values.address && !detailMerchant.address) {
    errors.address = "Address is required!";
  }
  if (!values.postalCode && !detailMerchant.postalCode) {
    errors.postalCode = "Postal Code is required!";
  }

  dispatch(setAddError(errors));
  return errors;
};

const onCancel = async (dispatch) => {
  dispatch(setAddForm({}));
  dispatch(setCancel(false));
};

const handleSave = async (
  dispatch,
  e,
  addForm,
  detailMerchant,
  setLoadingButton
) => {
  e.preventDefault();
  dispatch(setValidate(true));

  const isValid = Action.validate(dispatch, addForm, detailMerchant);
  if (Object.keys(isValid).length === 0) {
    let data = new FormData();
    data.append("id", detailMerchant.merchantId);

    if (addForm.phoneNumber !== "" || detailMerchant.phoneNumber !== "") {
      data.append("phoneNumber", addForm.phoneNumber || "");

      if (
        addForm.countryCodeId !== "" ||
        detailMerchant.countryCode.id !== ""
      ) {
        data.append(
          "countryCodeId",
          addForm.countryCodeId || detailMerchant.countryCode.id
        );
      } else {
        data.append("countryCodeId", "");
      }
    } else {
      data.append("phoneNumber", "");
      data.append("countryCodeId", "");
    }

    if (addForm.provincesId !== "" || detailMerchant.provinces.id !== "") {
      data.append("provincesId", addForm.provincesId || "");
    } else {
      data.append("provincesId", "");
    }

    if (addForm.citiesId !== "" || detailMerchant.cities.id !== "") {
      data.append("citiesId", addForm.citiesId || "");
    } else {
      data.append("citiesId", "");
    }

    if (addForm.districtsId !== "" || detailMerchant.districts.id !== "") {
      data.append("districtsId", addForm.districtsId || "");
    } else {
      data.append("districtsId", "");
    }
    if (addForm.postalCode !== "" || detailMerchant.postalCode !== "") {
      data.append("postalCode", addForm.postalCode || "");
    } else {
      data.append("postalCode", "");
    }

    if (addForm.address !== "" || detailMerchant.address !== "") {
      data.append("address", addForm.address || "");
    } else {
      data.append("address", "");
    }

    if (addForm.email !== "" || detailMerchant.email !== "") {
      data.append("email", addForm.email || "");
    } else {
      data.append("email", "");
    }

    if (addForm.name !== "" || detailMerchant.merchantName !== "") {
      data.append("name", addForm.name || "");
    } else {
      data.append("name", "");
    }

    if (addForm.merchantPhoto && detailMerchant.merchantPhoto !== "") {
      data.append(
        "photo",
        GeneralUtility.dataURLtoFile(
          addForm.merchantPhoto,
          addForm.merchantPhotoname
        ),
        addForm.merchantPhotoName
      );
    }
    dispatch(setLoadingButton(true));
    const response = await ManagementMerchantRepository.editMerchant(data);

    if (response.error === false) {
      let origin = { ...detailMerchant };
      if (data.name !== "" && data.name !== detailMerchant.merchantName) {
        origin.name = data.name;
      }

      if (data.address !== "" && data.address !== detailMerchant.address) {
        origin.address = data.address;
      }

      if (data.email !== "" && data.email !== detailMerchant.email) {
        origin.email = data.email;
      }

      if (
        data.phoneNumber !== "" &&
        data.phoneNumber !== detailMerchant.phoneNumber
      ) {
        origin.phoneNumber = data.phoneNumber;
      }

      if (data.photo !== "" && data.photo !== detailMerchant.merchantPhoto) {
        origin.merchantPhoto = data.photo;
      }
      dispatch(setDetailMerchant(origin));
      // dispatch(setAddForm(data));
      getList(dispatch, { currentPage: 0, postPerPage: 5 });
      dispatch(setShowDetail(false));
      dispatch(setModalEdit(""));
      dispatch(setValidate(false));
      dispatch(setLoadingButton(false));

      PopupUtility.success("Merchant has been successfully updated");
    } else {
      PopupUtility.responseValidate(response.status);
      dispatch(setLoadingButton(false));
    }
  }
};

const changeShowDetail = async (dispatch, showDetail, id) => {
  if (id) {
    let response = await ManagementMerchantRepository.getDetail({ id: id });
    if (!response.error) {
      let detail = { ...response.data.data };
      detail.dialcode = response.data.data.countryCode.dialCode;
      detail.countryCodeId = response.data.data.countryCode.id;
      detail.remark = response.data.data.remarkHistory;
      dispatch(setDetailMerchant(detail));
    } else {
      PopupUtility.responseValidate("Failed", response.message);
      dispatch(setDetailMerchant({}));
    }
  } else {
    // dispatch(setDetailMerchant({}));
    dispatch(setDetailMerchant({}));
  }
  dispatch(setShowDetail(showDetail));
};

const changeModalImage = async (dispatch, { showModal, title, img }) => {
  dispatch(setModalImage(showModal));
  dispatch(setTitleImage(title));
  dispatch(setSrcImage(img));
};

const handleSubmit = async (dispatch, status, { remarks, id }) => {
  let response;
  if (status === "0") {
    response = await ManagementMerchantRepository.suspendMerchant({
      id: id,
      remarks: remarks,
    });
  } else if (status === "1") {
    response = await ManagementMerchantRepository.reqSuspendMerchant({
      id: id,
      remarks: remarks,
    });
  } else if (status === "-1") {
    response = await ManagementMerchantRepository.unsuspendMerchant({
      id: id,
      remarks: remarks,
    });
  }

  if (!response.error) {
    PopupUtility.success(response.message);
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
    dispatch(setShowDetail(false));
    dispatch(setModalStatus(""));
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const changeModalEdit = async (dispatch, { showModal }) => {
  dispatch(setModalEdit(showModal));
};

const changeModal = async (dispatch, status, { showModal }) => {
  switch (status) {
    case "2":
      dispatch(setbuybackCompability(showModal));
      if (!showModal) {
        dispatch(setShowDetail(false));
        dispatch(setDetailMerchant({}));
      }
      break;
    case "3":
      dispatch(setModalEdit(showModal));
      break;
    default:
      dispatch(setModal(showModal));
      dispatch(setModalStatus(status));
      break;
  }
};

const changeBuybackCompability = async (dispatch, e, { id }) => {
  // e.preventDefault();
  let params = {
    id: id,
  };
  let response = await ManagementMerchantRepository.buybackCompability(params);
  if (!response.error) {
    dispatch(setbuybackCompability(false));
    dispatch(setShowDetail(false));
    getList(dispatch, { currentPage: 0, postPerPage: 5 });
  } else {
    dispatch(setbuybackCompability(false));
    dispatch(setShowDetail(false));
  }
};

const getCodePhone = async (dispatch) => {
  const phoneNumber = await AccountRepository.getCodePhone();
  dispatch(setCodephone(phoneNumber));
};

const getProvince = async (dispatch) => {
  const province = await AccountRepository.getProvince();
  dispatch(setProvince(province));
};

const getCity = async (dispatch, id) => {
  const city = await AccountRepository.getCity({ id: id });
  dispatch(setCity(city));
};

const getDistrict = async (dispatch, id) => {
  const district = await AccountRepository.getDistrict({ id: id });
  dispatch(setDistrict(district));
};

const handleChange = (dispatch, e, addForm) => {
  const { name, value } = e.target;
  dispatch(setAddForm({ ...addForm, [name]: value }));
};

const Action = {
  getList,
  validate,
  onCancel,
  handleSave,
  changeShowDetail,
  changeModalImage,
  changeModal,
  changeModalEdit,
  handleSubmit,
  changeBuybackCompability,
  getCodePhone,
  getProvince,
  getCity,
  getDistrict,
  handleChange,
};

export default Action;
