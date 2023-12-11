import AccountRepository from "../../../../../repositories/AccountRepository";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setBankDetails,
  setErrorBankDetails,
  setBank,
  setData,
  setEdit,
  setValidatePass,
  setCanSave,
  setValidateStatus,
  setPass,
} from "./Reducer";

const validate = (dispatch, values, editMode) => {
  const errors = {};
  if (editMode) {

    if (!values.AccountbankName) {
      errors.AccountbankName = "Merchant Bank Name is required!";
    }
    if (!values.bankId) {
      errors.bankId = "Merchant Bank Id is required!";
    }
    if (!values.bankNumber) {
      errors.bankNumber = "Merchant Bank Number is required!";
    } else if (!values.bankNumber.match(/^(\s*|[1-9][0-9]*)$/)) {
      errors.bankNumber = "Merchant Bank Number is number only!";
    }
  }

  dispatch(setErrorBankDetails(errors));
  if (Object.keys(errors).length === 0) {
    dispatch(setCanSave(true));
  } else {
    dispatch(setCanSave(false));
  }
  return errors;
};

const handleChange = (dispatch, e, bankDetails) => {
  const { name, value } = e.target;
  const newDetail = { ...bankDetails, [name]: value };
  dispatch(setBankDetails(newDetail));
};

const getBank = async (dispatch) => {
  const bank = await AccountRepository.getBank();
  dispatch(setBank(bank));
};

const getData = async (dispatch) => {
  const response = await AccountRepository.getBankDetails();
  let data = {};
  data.name = response.accountName;
  data.bankName = response.bankName;
  data.bankId = response.bankId;
  data.bankNumber = response.accountNumber;
  let bankDetail = {
    AccountbankName: response.accountName,
    bankName: response.bankName,
    bankId: response.bankId,
    bankNumber: response.accountNumber,
  };
  dispatch(setData(data));
  dispatch(setBankDetails(bankDetail));
  dispatch(setValidateStatus(true));
};

const checkValid = async (dispatch, pass, e) => {
  e.preventDefault();
  const valid = await AccountRepository.checkPass({ password: pass });
  if (valid.error === false) {
    dispatch(setValidatePass(false));
    dispatch(setEdit(true));
    dispatch(setPass(pass));
  } else {
    PopupUtility.responseValidate(valid.message, valid.error_message.password);
  }
};

const handleSubmit = async (dispatch, bankDetails, pass) => {
  let data = {}
    data.accountName = bankDetails.AccountbankName;
    data.bankId = bankDetails.bankId;
    data.accountNumber = bankDetails.bankNumber;
    data.password = pass;

  const response = await AccountRepository.updateBankDetails(data);
  if (response.error === false) {
    await getData(dispatch);
    PopupUtility.success("Changes saved successfully");
    dispatch(setEdit(false));
  } else {
    PopupUtility.responseValidate(response.message, response.error_message);
  }
};

const Action = {
  validate,
  handleSubmit,
  handleChange,
  getBank,
  getData,
  checkValid,
};

export default Action;
