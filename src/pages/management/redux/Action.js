import {
  setPage,
  setShowModalAdmin,
  setShowModalMerchant,
  setLevelAdmin,
  setGenerateAdminId,
  setAddForm,
  setRoleAdmin,
  setErrorAddForm,
  setValidate,
  setTotalReqMerchant,
} from "./Reducer";
import ManagementAdminRepository from "../../../repositories/ManagementAdminRepository";
import PopupUtility from "../../../utils/popup-utility";
import ManagementReqMerchantRepository from "../../../repositories/ManagementReqMerchant";

const getPage = async (store, { page }) => {
  store.dispatch(setPage(page));
};

const changeShowModalAdmin = async (dispatch, { showModal }) => {
  dispatch(setShowModalAdmin(showModal));
};

const changeShowModalMerchant = async (dispatch, { showModal }) => {
  dispatch(setShowModalMerchant(showModal));
};

const handleChange = (dispatch, e, addForm) => {
  const { name, value } = e.target;
  dispatch(setAddForm({ ...addForm, [name]: value }));
};

const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

const validate = (dispatch, values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.level) {
    errors.level = "Select Level";
  }
  if (!values.roleId) {
    errors.roleId = "Select Role";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (values.email && !validateEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  dispatch(setErrorAddForm(errors));
  return errors;

};

const getLevelAdmin = async (dispatch) => {
  const level = await ManagementAdminRepository.getLevelAdmin();
  dispatch(setLevelAdmin(level));
};

const getRoleAdmin = async (dispatch, code) => {
  const role = await ManagementAdminRepository.getRoleAdmin({ code: code });
  dispatch(setRoleAdmin(role));
};

const generateAdminId = async (dispatch) => {
  const response = await ManagementAdminRepository.generateAdminId();
  const resData = response.data.data;
  dispatch(setGenerateAdminId(resData));
};

const handleSubmit = async (dispatch, generateId, addForm, setDisabled, disabled) => {
  // dispatch(setValidate(true));
  const isValid = Action.validate(dispatch, addForm);

  if (Object.keys(isValid).length === 0) {

    const data = {};
    data.name = addForm.name;
    data.email = addForm.email;
    data.level = addForm.level;
    data.roleId = addForm.roleId;
    data.adminId = generateId;

    dispatch(setDisabled(true));
    const response = await ManagementAdminRepository.createAdmin(data);
    if (response.error === false) {
      dispatch(setAddForm({}));
      PopupUtility.success("Created Admin Successfully");
      Action.changeShowModalAdmin(dispatch, { showModal: false });
      dispatch(setDisabled(false));
    } else {
      PopupUtility.responseValidate("Failed", response.message);
      dispatch(setAddForm({}))
      dispatch(setDisabled(false));
    }
  }
};

const getCountReqMerchant = async (dispatch) => {
  let response = await ManagementReqMerchantRepository.getMerchantReq({
    page: 0,
    search: "",
    size: 1,
  });
  if (!response.error) {
    dispatch(setTotalReqMerchant(response.total));
  } else {
    dispatch(setTotalReqMerchant(0));
  }
};

const Action = {
  getPage,
  changeShowModalAdmin,
  changeShowModalMerchant,
  handleChange,
  getLevelAdmin,
  getRoleAdmin,
  generateAdminId,
  handleSubmit,
  validate,
  getCountReqMerchant,
};

export default Action;
