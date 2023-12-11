import Cookies from "js-cookie";
import AuthRepository from "../../repositories/AuthRepository";
import EncryptDecrypt from "../../services/encrypt-decrypt";
import RouteName from "../../services/routename";
import PopupUtility from "../../utils/popup-utility";

const login = async (
  data,
  rememberme,
  // navigate, t, setFormErrors, setValidation, 
  popup, setPopup, setCount) => {
  let res = await AuthRepository.getAuth(data);
  if (!res.error) {
    let response = res.data.data;

    let user = {};
    user.adminId = response.adminId;
    user.email = response.email;
    user.nameAdmin = response.nameAdmin;
    user.level = response.role.level;
    user.roleId = response.role.roleId;
    user.roleName = response.role.roleName;

    if (user.roleId === "SA1") {
      window.location = RouteName.dashboard;
    }
    if (user.roleId === "MG1") {
      window.location = RouteName.dashboard;
    }
    if (user.roleId === "MG2") {
      window.location = RouteName.management;
    }
    if (user.roleId === "MG3") {
      window.location = RouteName.management;
    }
    if (user.roleId === "ST4") {
      // navigate(RouteName.generateqr)
      window.location = RouteName.generateqr;
    }
    if (user.roleId === "ST1") {
      // navigate(RouteName.management)
      window.location = RouteName.management;
    }
    if (user.roleId === "ST2") {
      window.location = RouteName.management;
    }
    if (user.roleId === "ST3") {
      window.location = RouteName.balance;
    }

    const typeFunction = response.role.listPermission.filter(
      (item) => item.type === "function"
    );
    const typeButton = response.role.listPermission.filter(
      (item) => item.type === "button"
    );

    //set session on cookie and encrypt the data
    Cookies.set(
      "token",
      EncryptDecrypt.enc(response.auth.token, { expires: 3 })
    );
    Cookies.set(
      "refreshToken",
      EncryptDecrypt.enc(response.auth.refreshToken, { expires: 3 })
    );

    Cookies.set("user", EncryptDecrypt.enc(user), { expires: 3 });
    Cookies.set("photoAdmin", response.photoAdmin, {
      expires: 3,
    });
    Cookies.set("hitRefreshToken", 0, { expires: 3 });
    Cookies.set("roleFunction", EncryptDecrypt.enc(typeFunction), {
      expires: 3,
    });
    localStorage.setItem("roleButton", EncryptDecrypt.enc(typeButton), {
      expires: 3,
    });
    setCount(0);


    if (rememberme) {
      Cookies.set("email", EncryptDecrypt.enc(data.email));
      Cookies.set("password", EncryptDecrypt.enc(data.password));
    } else {
      Cookies.remove("email");
      Cookies.remove("password");
    }

  } else if (res.status === 403) {
    setPopup({
      status: !popup.status,
      message: res.message
    });
  } else {
    setCount(prev => prev + 1);
    setPopup({
      status: true,
      message: res.error_message[0]
    });
  }
};

const forgotPassword = async (data, setError, setShowCaptcha, setEmail, setIsVerified) => {
  let response = await AuthRepository.getEmail(data);
  if (response.error) {
    setEmail("");
    setError(response.error_message);
    setShowCaptcha(false);
    setIsVerified(false);
  } else {
    PopupUtility.success(response.message, "Check Your Inbox Email");
    window.location = RouteName.login;
    setIsVerified(false);
  }
};

const resetPassword = async (data) => {
  let response = await AuthRepository.resetPassword(data);
  if (response.error) {
    PopupUtility.responseValidate(
      "Password do not match. Please try again.",
      response.message
    );
  } else {
    PopupUtility.success(response.message, "Password Changed Successfully!");
    window.location = RouteName.login;
  }
};

const getUser = () => {
  // get data user from cookie
  let data = Cookies.get("user");
  if (data) {
    let user = EncryptDecrypt.dec(data);
    return user;
  } else {
    return "";
  }
};

const getRole = () => {
  // get data user from cookie
  let data = Cookies.get("user");
  if (data) {
    let user = EncryptDecrypt.dec(data);
    return user.roleId;
  } else {
    return "";
  }
};

const getPhoto = () => {
  // get data user from cookie
  let data = Cookies.get("photoAdmin");
  if (data && data !== "text") {
    return data;
  } else {
    return "";
  }
};

// const userAccess = () => {
//   let userRole = Cookies.get("userAccess");
//   return userRole === "SA1" || userRole === "MG1" || userRole === "MG2" || userRole === "MG3";
// };


const checkFunction = (value, type) => {
  if (value) {
    let cookies;
    let data;

    if (type === "button") {
      cookies = localStorage.getItem("roleButton");
    }
    else if (type === "function") {
      cookies = Cookies.get("roleFunction");
    }

    data = EncryptDecrypt.dec(cookies);
    const permission = data.filter((item) => item.identifier === value);
    if (permission.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};

const logout = () => {
  // remote data from cookie
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("user");
  Cookies.remove("language");
  Cookies.remove("photoAdmin");
  Cookies.remove("hitRefreshToken");
  Cookies.remove("roleFunction");
  Cookies.remove("roleButton");
  localStorage.removeItem("roleButton");
  window.location = RouteName.login;
};

const UseAuth = {
  login,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
  getPhoto,
  checkFunction,
  getRole,
  // userAccess,
};

export default UseAuth;
