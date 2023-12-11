import Cookies from "js-cookie";
import AccountRepository from "../../../../../repositories/AccountRepository";
import EncryptDecrypt from "../../../../../services/encrypt-decrypt";
import GeneralUtility from "../../../../../utils/general-utility";
import PopupUtility from "../../../../../utils/popup-utility";
import {
  setEditProfile,
  setErrorEditProfile,
  setValidateStatus,
  setValidatePass,
  setData,
  setCodePhone,
  setPass,
} from "./Reducer";
import RouteName from "../../../../../services/routename";
import UseAuth from "../../../../auth/Auth";

const validate = (dispatch, values) => {
  const errors = {};
  if (!values.photo) {
    errors.photo = "Admin Photo is required!";
  }
  if (!values.name) {
    errors.name = "Admin Name is required!";
  }
  if (!values.adminId) {
    errors.adminId = "Admin Id is required!";
  }
  if (!values.level) {
    errors.level = "Level is required!";
  }
  if (!values.role) {
    errors.role = "Role is required!";
  }

  if (!values.email) {
    errors.email = "Admin Email is required!";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Admin Phone is required!";
  } else if (!values.countryCodeId) {
    errors.phoneNumber = "Code National Number is required!";
  } else if (!values.phoneNumber.length <= 10) {
    errors.phoneNumber = "Phone Number at least 10 number!";
  }
  if (!values.countryCodeId) {
    errors.countryCodeId = "Code National Number is required!";
  }
  dispatch(setErrorEditProfile(errors));
  return errors;
};

const handleChange = (dispatch, e, editProfile) => {
  const { name, value } = e.target;
  dispatch(setEditProfile({ ...editProfile, [name]: value }));
};

const getCodePhone = async (dispatch) => {
  const phoneNumber = await AccountRepository.getCodePhone();
  dispatch(setCodePhone(phoneNumber));
};

const getData = async (dispatch) => {
  const response = await AccountRepository.getAccountProfile();

  let data = {};
  data.id = response.adminId;
  data.photo = response.photo;
  data.name = response.name;
  data.email = response.email;
  data.phoneNumber = response.phoneNumber;
  data.countryCodeId = response.countryCodeId;
  data.countryCode_dialCode = response.dialCode;
  data.level = response.level;
  data.role = response.role;


  //update cookies user info and photoprofile
  let user = UseAuth.getUser();
  user.nameAdmin = response.name;
  Cookies.set("user", EncryptDecrypt.enc(user));
  Cookies.set("photoAdmin", response.photo);

  let editProfile = {
    name: data.name,
    photo: data.photo,
    email: data.email,
    phoneNumber: data.phoneNumber,
    countryCode_id: data.countryCodeId,
    countryCode_dialCode: data.countryCode_dialCode,
    level: data.level,
    role: data.role,
  };
  dispatch(setData(data));
  dispatch(setEditProfile(editProfile));
  dispatch(setValidateStatus(true));
};

const handleSubmit = async (
  dispatch,
  pass,
  editProfile,
  originalData,
  validatePassword,
  cookie,
  password
) => {
  if (validatePassword === true) {
    const response = await AccountRepository.checkPass({ password: pass });
    if (response.error === false) {
      dispatch(setValidatePass(false));
      dispatch(setPass(pass));
    } else {
      PopupUtility.responseValidate("Failed");
      return;
    }
  }

  let data = new FormData();
  if (editProfile.name === originalData.name) {
    data.append("password", pass);
    
  } 
  else if (editProfile.name !== originalData.name) {
    if (editProfile.name !== originalData.name && editProfile.phoneNumber !== originalData.phoneNumber) {
      data.append("password", pass);
    } else if (editProfile.name !== originalData.name && editProfile.email !== originalData.email) {
      data.append("password", pass);
    } else {
      data.append("password", "");
    }
    // data.append("password", "");
    
  } 
  // else if (editProfile.name !== originalData.name && editProfile.phoneNumber !== originalData.phoneNumber) {
  //   data.append("password", pass);
  // } 
  else {
    
  //   if (editProfile.phoneNumber !== "" || originalData.phoneNumber !== "") {
  //   data.append("phoneNumber", editProfile.phoneNumber || "");
  //   // data.append("password", pass);

  //   if (editProfile.countryCodeId !== "" || originalData.countryCodeId !== "") {
  //     data.append(
  //       "countryCodeId",
  //       editProfile.countryCodeId || originalData.countryCodeId
  //     );
  //     // data.append("password", pass)
  //   } else {
  //     data.append("countryCodeId", "");
  //   }
  // } else {
  //   data.append("phoneNumber", "");
  //   data.append("countryCodeId", "");
  // }
    data.append("password", pass);
  }
  

  // if (editProfile.phoneNumber !== "" || originalData.phoneNumber !== "") {
  //   data.append("phoneNumber", editProfile.phoneNumber || "");
  //   // data.append("password", pass);

  //   if (editProfile.countryCodeId !== "" || originalData.countryCodeId !== "") {
  //     data.append(
  //       "countryCodeId",
  //       editProfile.countryCodeId || originalData.countryCodeId
  //     );
  //   } else {
  //     data.append("countryCodeId", "");
  //   }
  // } else {
  //   data.append("phoneNumber", "");
  //   data.append("countryCodeId", "");
  // }
  









    if (editProfile.phoneNumber !== originalData.phoneNumber) {
    data.append("phoneNumber", editProfile.phoneNumber);
    // data.append("password", pass);

       if (editProfile.countryCodeId !== "" || originalData.countryCodeId !== "") {
      data.append(
        "countryCodeId",
        editProfile.countryCodeId || originalData.countryCodeId
      );
    } else {
      data.append("countryCodeId", "");
    }
  } else {
    data.append("phoneNumber", "");
    data.append("countryCodeId", "");
  }

  if (editProfile.name === originalData.name) {
    data.append("name", "");
  } else {
    data.append("name", editProfile.name);
  }

  if (editProfile.email === originalData.email) {
    data.append("email", "");
  } else {
    data.append("email", editProfile.email);
  }

  if (editProfile.photo !== originalData.photo) {
    data.append(
      "photo",
      GeneralUtility.dataURLtoFile(editProfile.photo, editProfile.namePhoto),
      editProfile.namePhoto
    );
  }

  const response = await AccountRepository.updateAccountProfile(data);
  if (response.error === false) {
    let origin = { ...originalData };
    if (data.name !== "" && data.name !== originalData.name) {
      origin.name = data.name;
    }

    if (data.email !== "" && data.email !== originalData.email) {
      origin.email = data.email;
      const resData = response.data.data;
      if (cookie) {
        //set session on cookie and encrypt the data
        Cookies.set(
          "token",
          EncryptDecrypt.enc(resData.accessToken, { expires: 3 })
        );
        Cookies.set(
          "refreshToken",
          EncryptDecrypt.enc(resData.refreshToken, { expires: 3 })
        );
      }
    }

    if (
      data.phoneNumber !== "" &&
      data.phoneNumber !== originalData.phoneNumber
    ) {
      origin.phoneNumber = data.phoneNumber;
    }
    if (
      data.countryCodeId !== "" &&
      data.countryCodeId !== originalData.countryCodeId
    ) {
      origin.countryCodeId = data.countryCodeId;
    }

    if (data.photo !== "" && data.photo !== originalData.photo) {
      origin.photo = data.photo;
    }
    dispatch(setData(origin));

    PopupUtility.success(response.message);
    window.location = RouteName.accountsettings;
  } else {
    let errMsg = "";
    for (let i = 0; i < Object.keys(response.error_message).length; i++) {
      const err = Object.values(response.error_message)[i];
      errMsg = errMsg.concat(err + "<br />");
    }
    PopupUtility.responseValidate(response.message, errMsg);
  }
};

const Action = {
  getCodePhone,
  getData,
  handleChange,
  handleSubmit,
  // checkValid,
  validate,
};

export default Action;
