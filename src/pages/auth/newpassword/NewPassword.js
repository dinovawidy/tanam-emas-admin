import React, { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import { NavLink, useNavigate } from "react-router-dom";
import RouteName from "../../../services/routename";
import UseAuth from "../Auth";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [showconfirmpass, setShowconfirmpass] = useState(false);
  const navigate = useNavigate();
  const t = useTranslation();

  const handleNewpass = async (e) => {
    e.preventDefault();
    if(newPassword !== confirmNewPassword) {
      setErrorMessage("Password do not match. Please try again.");
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      const data = {
        token:token,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      };
      UseAuth.resetPassword(data)
    }
  };

  useEffect(() => {
    const isAuthenticated = UseAuth.getUser();
    if (isAuthenticated) {
      navigate(RouteName.dashboard);
    }
  }, []);
  return (
    <div className="section py-10 px-6 lg:mx-20 md:mx-28">
      <NavLink to={RouteName.login} className="">
        <img src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon-auth.svg"} />
      </NavLink>
      <form>
        <h2 className="txt-green1 font-bold pl-2 pt-6">
          {t("newpassword.title")}
        </h2>
        <h3 className="font-medium pl-2 pt-4">{t("newpassword.subtitle")}</h3>

        <label className="relative block mt-6">
          <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
            <img
              className="h-3.5 w-5 fill-slate-300"
              src={process.env.REACT_APP_ASSETS_IMAGE + "password-icon.svg"}
              alt="username-icon"
            />
          </span>
          <input
            type={`${showpass ? "text" : "password"}`}
            placeholder={t("newpassword.new_pass")}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-3 pl-10 pr-3 bg-white border shadow-sm placeholder:text-slate-400 block w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-green-tertiary"
            value={newPassword}
          />
          <span
            className="absolute inset-y-0 right-1.5 items-center"
            onClick={() => setShowpass(!showpass)}
          >
            <img
              className="h-full w-7 cursor-pointer"
              src={
                process.env.REACT_APP_ASSETS_IMAGE +
                "eye-" +
                (showpass ? "hide" : "show") +
                ".svg"
              }
              alt="eye-hide"
            />
          </span>
        </label>

        <label className="relative block mt-6">
          <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
            <img
              className="h-3.5 w-5 fill-slate-300"
              src={process.env.REACT_APP_ASSETS_IMAGE + "password-icon.svg"}
              alt="username-icon"
            />
          </span>
          <input
            type={`${showconfirmpass ? "text" : "password"}`}
            placeholder={t("newpassword.confirm_pass")}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="px-3 py-3 pl-10 pr-3 bg-white border shadow-sm placeholder:text-slate-400 block w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm txt-green1"
            value={confirmNewPassword}
          />
          <span
            className="absolute inset-y-0 right-1.5 items-center"
            onClick={() => setShowconfirmpass(!showconfirmpass)}
          >
            <img
              className="h-full w-7 cursor-pointer"
              src={
                process.env.REACT_APP_ASSETS_IMAGE +
                "eye-" +
                (showconfirmpass ? "hide" : "show") +
                ".svg"
              }
              alt="eye-hide"
            />
          </span>
        </label>

        <div className="pt-6 text-center">
          <p className="font-bold">{t("newpassword.rules")}</p>
          <div className="flex gap-x-3 flex-row pt-2">
            <div className="basis-1/4 flex flex-col">
              <img
                className=""
                src={process.env.REACT_APP_ASSETS_IMAGE + "lowercase.svg"}
                alt="lowercase"
              />
              <p>{t("newpassword.lowercase")}</p>
            </div>
            <div className="basis-1/4 flex flex-col">
              <img
                src={process.env.REACT_APP_ASSETS_IMAGE + "uppercase.svg"}
                alt="lowercase"
              />
              <p>{t("newpassword.uppercase")}</p>
            </div>
            <div className="basis-1/4 flex flex-col">
              <img
                src={process.env.REACT_APP_ASSETS_IMAGE + "number.svg"}
                alt="lowercase"
              />
              <p>{t("newpassword.number")}</p>
            </div>
            <div className="basis-1/4 flex flex-col">
              <img
                src={process.env.REACT_APP_ASSETS_IMAGE + "char.svg"}
                alt="lowercase"
              />
              <p>{t("newpassword.char")}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 text-right">
          <button
            onClick={handleNewpass}
            className="button min-w-fit hover:bg-gold-secondary bg-green-tertiary text-green-white text-sm font-bold py-3 px-16 rounded-lg"
          >
            {t("newpassword.button").toUpperCase()}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
