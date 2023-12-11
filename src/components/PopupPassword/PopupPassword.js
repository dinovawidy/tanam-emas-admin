import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonGreen from "../ButtonGreen/ButtonGreen";

const PopupPassword = ({ onCancel, onSubmit, section }) => {
  const t = useTranslation();
  const [showpass, setShowpass] = useState(false);
  const [pass, setPass] = useState("");
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => {
          onCancel();
        }}
      />
      <div className="flex items-center min-h-screen px-4 py-2">
        <div className="relative w-full max-w-md p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
          <div className="mx-3">
            <div className="text-right">
              <div
                className="cursor-pointer text-gold-secondary text-xl"
                onClick={() => {
                  onCancel();
                }}
              >
                x
              </div>
            </div>
            <div className="py-10">
              <div className="text-2xl font-bold text-green-primary">
                {t("accountsettings.input_password")}
              </div>
              <div className="text-md text-green-primary">
                {t("accountsettings.password_subtitle", { params: section })}
              </div>
              <label className="relative block mt-6">
                <span className="absolute inset-y-0 left-1.5 flex items-center pl-2">
                  <img
                    className="h-3.5 w-5 fill-slate-300"
                    src={
                      process.env.REACT_APP_ASSETS_IMAGE + "password-icon.svg"
                    }
                    alt="username-icon"
                  />
                </span>
                <input
                  type={`${showpass ? "text" : "password"}`}
                  name="password"
                  placeholder={t("login.password")}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  className="px-3 py-3 pl-10 pr-3 bg-white border shadow-sm placeholder:text-slate-400 block w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm txt-green1"
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
            </div>
            <div className="mt-3 flex justify-end">
              <ButtonGreen
                title={t("Next")}
                onClick={(e) => {
                  onSubmit(pass, e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupPassword;
