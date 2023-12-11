import AccountRepository from "../../../../../repositories/AccountRepository";
import Cookies from "js-cookie";
import EncryptDecrypt from "../../../../../services/encrypt-decrypt";
import PopupUtility from "../../../../../utils/popup-utility";
import { setEditPass, setErrorEditPass, setCanSave } from "./Reducer";

const validate = (dispatch, values) => {
  const errors = {};
  if (values.new_password.length < 8) {
    errors.char = "Password must at least 8 number!";
  }
  if (values.new_password.search(/[0-9]/) < 0) {
    errors.number = "Password must contain at least one number!";
  }
  if (values.new_password.search(/[a-z]/) < 0) {
    errors.lowercase = "Password must contain at least one lowercase!";
  }
  if (values.new_password.search(/[A-Z]/) < 0) {
    errors.uppercase = "Password must contain at least one uppercase!";
  }
  if (values.confirm_password !== values.new_password) {
    errors.confirm_password = "Password doesnt match!";
  }

  dispatch(setErrorEditPass(errors));
  if (Object.keys(errors).length === 0) {
    dispatch(setCanSave(true));
  } else {
    dispatch(setCanSave(false));
  }
  return errors;
};

const handleChange = (dispatch, e, editPass) => {
  const { name, value } = e.target;
  dispatch(setEditPass({ ...editPass, [name]: value }));
};

const handleSubmit = async (dispatch, e, editPass) => {
  e.preventDefault();
  let data = {
    currentPassword: editPass.password,
    newPassword: editPass.new_password,
    confirmNewPassword: editPass.confirm_password,
  };
  const response = await AccountRepository.changePassword(data);
  if (response.error === false) {
    const resData = response.data;
    if (resData.adminId) {
      let user = {};
      //user.userId = resData.id;
      user.adminId = resData.adminId;
      user.email = resData.email;
      user.nameAdmin = resData.nameAdmin;
      user.level = resData.role.level;
      user.roleId = resData.role.roleId;
      user.roleName = resData.role.roleName;

      //set session on cookie and encrypt data
      Cookies.set(
        "token",
        EncryptDecrypt.enc(response.auth.token, { expires: 3 })
      );
      Cookies.set("user", EncryptDecrypt.enc(user), { expires: 3 });
      Cookies.set("photoAdmin", response.photoAdmin, {
        expires: 3,
      });
    }
    PopupUtility.success("Password has been changed successfully");
  } else {
    PopupUtility.responseValidate(response.message, response.error_message);
  }
};
const Action = {
  validate,
  handleChange,
  handleSubmit,
};

export default Action;
