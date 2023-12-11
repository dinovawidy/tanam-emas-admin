import AccountRepository from "../../../../../repositories/AccountRepository";
import ManagementMerchantRepository from "../../../../../repositories/ManagementMerchantRepository";
import ManagementReqMerchantRepository from "../../../../../repositories/ManagementReqMerchant";
import GeneralUtility from "../../../../../utils/general-utility";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setCurrentPage,
  setList,
  setLoading,
  setModalApprove,
  setModalDecline,
  setModalReqApprove,
  setShowDetail,
  setModalEdit,
  setTotal,
  setTotalPage,
  setModalImage,
  setTitleImage,
  setSrcImage,
  setDetailMerchant,
  setSearch,
  setPostPerPage,
  setCity,
  setCodePhone,
  setDistrict,
  setFieldName,
  setOrderBy,
  setProvince,
  setAddForm,
  setAddError,
  setCancel,
  setValidate,
  setLoadingBtn,
} from "./Reducer";

const getList = async (
  dispatch,
  { page, search, postPerPage, fieldName, orderBy }
) => {
  dispatch(setSearch(search));
  dispatch(setCurrentPage(page));
  dispatch(setPostPerPage(postPerPage));
  dispatch(setLoading(true));
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

  let response = await ManagementReqMerchantRepository.getMerchantReq(data);
  if (response.error === false) {
    dispatch(setLoading(false));
    dispatch(setList(response.data));
    dispatch(setTotal(response.total));
    dispatch(setTotalPage(response.total_pages));
  }
};

const getDetailMerchant = async (dispatch, data) => {
  dispatch(setDetailMerchant(data));
};

const changeShowDetail = async (dispatch, showDetail) => {
  dispatch(setShowDetail(showDetail));
};

const changeModalApprove = async (dispatch, { showModal }) => {
  dispatch(setModalApprove(showModal));
};

const changeModalReqApprove = async (dispatch, { showModal }) => {
  dispatch(setModalReqApprove(showModal));
};

const changeModalDecline = async (dispatch, { showModal }) => {
  dispatch(setModalDecline(showModal));
};

const changeModalEdit = async (dispatch, { showModal }) => {
  dispatch(setModalEdit(showModal));
};

const changeModalImage = async (dispatch, { showModal, title, img }) => {
  dispatch(setModalImage(showModal));
  dispatch(setTitleImage(title));
  dispatch(setSrcImage(img));
};

const handleSubmitApprove = async (dispatch, { item, remarks }) => {
  dispatch(setLoadingBtn(true));
  let data = {
    id: item.id,
    status: 4, // id status approval (check enumStatus di detail.js)
    remarks: remarks,
  };
  let response = await ManagementReqMerchantRepository.postRequestApproval(
    data
  );
  if (!response.error) {
    PopupUtility.success("A merchant application request has been approved.");
    dispatch(setModalReqApprove(false));
    getList(dispatch, { page: 0, postPerPage: 5 });
    changeShowDetail(dispatch, false);
  } else {
    PopupUtility.responseValidate("Login Failed", response.message);
  }
  dispatch(setLoadingBtn(false));
};

const handleSubmitReqApprove = async (dispatch, { item, remarks }) => {
  let data = {
    id: item.id,
    status: 3, // id status request approval (check enumStatus di detail.js)
    remarks: remarks,
  };
  let response = await ManagementReqMerchantRepository.postRequestApproval(
    data
  );
  if (!response.error) {
    PopupUtility.success(
      "A merchant application request has been request approved."
    );
    dispatch(setModalReqApprove(false));
    getList(dispatch, { page: 0, postPerPage: 5 });
    changeShowDetail(dispatch, false);
  } else {
    PopupUtility.responseValidate("Login Failed", response.message);
  }
};

const handleSubmitDecline = async (dispatch, { item, remarks }) => {
  let data = {
    id: item.id,
    status: -2, // id status decline (check enumStatus di detail.js)
    remarks: remarks,
  };
  let response = await ManagementReqMerchantRepository.postRequestApproval(
    data
  );
  if (!response.error) {
    PopupUtility.success("A merchant application request has been declined.");
    dispatch(setModalReqApprove(false));
    getDetailMerchant(dispatch, {});
    changeShowDetail(dispatch, false);
  } else {
    PopupUtility.responseValidate("Login Failed", response.message);
  }
};

const getCodePhone = async (dispatch) => {
  const phoneNumber = await AccountRepository.getCodePhone();
  dispatch(setCodePhone(phoneNumber));
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

const onCancel = async (dispatch) => {
  dispatch(setAddForm({}));
  dispatch(setCancel(false));
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

const handleSave = async (dispatch, e, addForm, detailMerchant, setLoadingBtn) => {
  e.preventDefault();
  dispatch(setValidate(true));
  const isValid = Action.validate(dispatch, addForm, detailMerchant);
  if (Object.keys(isValid).length === 0) {
    let data = new FormData();
    data.append("id", detailMerchant.id);

    if (addForm.phoneNumber !== "" || detailMerchant.phoneNumber !== "") {
      data.append("phoneNumber", addForm.phoneNumber || "");

      if (addForm.countryCodeId !== "" || detailMerchant.countryCode_id !== "") {
        data.append(
          "countryCodeId",
          addForm.countryCodeId || detailMerchant.countryCode_id
        );
      } else {
        data.append("countryCodeId", "");
      }
    } else {
      data.append("phoneNumber", "");
      data.append("countryCodeId", "");
    }

    if (addForm.provincesId !== "" || detailMerchant.provincesId !== "") {
      data.append("provincesId", addForm.provincesId || "");
    } else {
      data.append("provincesId", "");
    }

    if (addForm.citiesId !== "" || detailMerchant.citiesId !== "") {
      data.append("citiesId", addForm.citiesId || "");
    } else {
      data.append("citiesId", "");
    }

    if (addForm.districtsId !== "" || detailMerchant.districtsId !== "") {
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
    dispatch(setLoadingBtn(true));
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
        data.phoneNumber !== "" && data.phoneNumber !== detailMerchant.phoneNumber
      ) {
        origin.phoneNumber = data.phoneNumber;
      }

      if (data.photo !== "" && data.photo !== detailMerchant.merchantPhoto) {
        origin.merchantPhoto = data.photo;
      }
      dispatch(setDetailMerchant(origin));
      // dispatch(setAddForm(data));
      getList(dispatch, { page: 0, postPerPage: 5 });
      dispatch(setShowDetail(false));
      dispatch(setModalEdit(""));
      dispatch(setValidate(false));

      PopupUtility.success("Merchant has been successfully updated");
      dispatch(setLoadingBtn(false))
    } else {
      PopupUtility.responseValidate(response.status);
      dispatch(setLoadingBtn(false))
    }
  }
};

const Action = {
  getList,
  changeShowDetail,
  changeModalEdit,
  changeModalApprove,
  changeModalDecline,
  changeModalReqApprove,
  changeModalImage,
  handleSubmitApprove,
  handleSubmitReqApprove,
  handleSubmitDecline,
  getDetailMerchant,
  getCodePhone,
  getProvince,
  getCity,
  getDistrict,
  handleChange,
  onCancel,
  handleSave,
  validate,
};

export default Action;
