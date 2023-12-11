import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../../../services/store-helper";
import Action from "./redux/Action";
import reducerSlice, {
  setShowConfirm,
  setShowCurrent,
  setShowNew,
} from "./redux/Reducer";

const ChangePassword = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  store.getState();

  const MainComponent = () => {
    const t = useTranslation();
    const dispatch = useDispatch();
    const showCurrent = useSelector((state) => state.reducer.showCurrent);
    const showNew = useSelector((state) => state.reducer.showNew);
    const showConfirm = useSelector((state) => state.reducer.showConfirm);
    const editPass = useSelector((state) => state.reducer.editPass);
    const errorEditPass = useSelector((state) => state.reducer.errorEditPass);
    const canSave = useSelector((state) => state.reducer.canSave);

    useEffect(() => {
      Action.validate(dispatch, editPass);
    }, [editPass]);
    return (
      <form>
        <div className="flex flex-col gap-y-4 md:h-[37em] px-3 overflow-y-auto">
          <div className="opacity-60 font-bold text-md">
            {t("accountsettings.change_password").toUpperCase()}
          </div>

          <div className="flex flex-row items-center gap-x-3">
            <div className="w-60">
              <div className="text-md font-bold">
                {t("accountsettings.current_pass")}
                <span className=" text-gold-secondary">*</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="relative block">
                <input
                  type={`${showCurrent ? "text" : "password"}`}
                  name="password"
                  onChange={(e) => {
                    Action.handleChange(dispatch, e, editPass);
                  }}
                  placeholder={t("accountsettings.ph_current")}
                  className={`rounded-xl border-0 w-full text-md text-green-secondary ${
                    errorEditPass.password
                      ? "border-red-500 border-1"
                      : "border-0"
                  }`}
                />
                <span
                  className="absolute inset-y-0 right-1.5 items-center"
                  onClick={() => dispatch(setShowCurrent(!showCurrent))}
                >
                  <img
                    className="h-full w-7 cursor-pointer"
                    src={
                      process.env.REACT_APP_ASSETS_IMAGE +
                      "eye-" +
                      (showCurrent ? "hide" : "show") +
                      ".svg"
                    }
                    alt="eye-hide"
                  />
                </span>
              </label>
              <p className="text-red-500">{errorEditPass.password}</p>
            </div>
          </div>
          <hr />

          {/* New Password */}
          <div className="flex flex-row items-center gap-x-3">
            <div className="w-60">
              <div
                className={`text-md font-bold ${
                  errorEditPass.new_password ? "pb-4" : " "
                }`}
              >
                {t("accountsettings.new_pass")}
                <span className=" text-gold-secondary">*</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="relative block">
                <input
                  type={`${showNew ? "text" : "password"}`}
                  name="new_password"
                  onChange={(e) => {
                    Action.handleChange(dispatch, e, editPass);
                  }}
                  placeholder={t("accountsettings.ph_new")}
                  className={`rounded-xl border-0 w-full text-md text-green-secondary ${
                    errorEditPass.password
                      ? "border-red-500 border-1"
                      : "border-0"
                  }`}
                />
                <span
                  className="absolute inset-y-0 right-1.5 items-center"
                  onClick={() => dispatch(setShowNew(!showNew))}
                >
                  <img
                    className="h-full w-7 cursor-pointer"
                    src={
                      process.env.REACT_APP_ASSETS_IMAGE +
                      "eye-" +
                      (showNew ? "hide" : "show") +
                      ".svg"
                    }
                    alt="eye-hide"
                  />
                </span>
              </label>
              <p className="text-red-500">{errorEditPass.new_password}</p>
            </div>
          </div>
          <hr />

          {/* Confirm Password */}
          <div className="flex flex-row items-center gap-x-3">
            <div className="w-60">
              <div
                className={`text-md font-bold ${
                  errorEditPass.confirm_password ? "pb-4" : " "
                }`}
              >
                {t("accountsettings.confirm_pass")}
                <span className=" text-gold-secondary">*</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="relative block">
                <input
                  type={`${showConfirm ? "text" : "password"}`}
                  name="confirm_password"
                  onChange={(e) => {
                    Action.handleChange(dispatch, e, editPass);
                  }}
                  placeholder={t("accountsettings.ph_confirm")}
                  className={`rounded-xl border-0 w-full text-md text-green-secondary ${
                    errorEditPass.confirm_password
                      ? "border-red-500 border-1"
                      : "border-0"
                  }`}
                />
                <span
                  className="absolute inset-y-0 right-1.5 items-center"
                  onClick={() => dispatch(setShowConfirm(!showConfirm))}
                >
                  <img
                    className="h-full w-7 cursor-pointer"
                    src={
                      process.env.REACT_APP_ASSETS_IMAGE +
                      "eye-" +
                      (showConfirm ? "hide" : "show") +
                      ".svg"
                    }
                    alt="eye-hide"
                  />
                </span>
              </label>
              <p className="text-red-500">{errorEditPass.confirm_password}</p>
            </div>
          </div>
          <hr />

          {/* Validation */}
          <div className="flex flex-row items-center gap-x-3">
            <div className="w-60"></div>
            <div className="flex-1">
              <div className="font-medium py-5">
                <p className="font-bold text-md">{t("newpassword.rules")}</p>
                <div className="flex flex-row gap-x-12 pt-2">
                  <div className="flex flex-col text-center">
                    <img
                      className="h-9"
                      src={
                        process.env.REACT_APP_ASSETS_IMAGE +
                        `${
                          errorEditPass.lowercase
                            ? "lowercase-inactive.svg"
                            : "lowercase.svg"
                        }`
                      }
                      alt="lowercase"
                    />
                    <p>{t("newpassword.lowercase")}</p>
                  </div>
                  <div className="flex flex-col text-center">
                    <img
                      className="h-9"
                      src={
                        process.env.REACT_APP_ASSETS_IMAGE +
                        `${
                          errorEditPass.uppercase
                            ? "uppercase-inactive.svg"
                            : "uppercase.svg"
                        }`
                      }
                      alt="uppercase"
                    />
                    <p>{t("newpassword.uppercase")}</p>
                  </div>
                  <div className="flex flex-col text-center">
                    <img
                      className="h-9"
                      src={
                        process.env.REACT_APP_ASSETS_IMAGE +
                        `${
                          errorEditPass.number
                            ? "number-inactive.svg"
                            : "number.svg"
                        }`
                      }
                      alt="number"
                    />
                    <p>{t("newpassword.number")}</p>
                  </div>
                  <div className="flex flex-col text-center">
                    <img
                      className="h-9"
                      src={
                        process.env.REACT_APP_ASSETS_IMAGE +
                        `${
                          errorEditPass.char ? "char-inactive.svg" : "char.svg"
                        }`
                      }
                      alt="char"
                    />
                    <p>{t("newpassword.char")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse gap-x-2 pt-5 pb-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (canSave) {
                  Action.handleSubmit(dispatch, e, editPass);
                }
              }}
              className={`button md:w-36 text-white border-2 text-xs tracking-widest font-bold py-3 rounded-xl ${
                canSave
                  ? "hover:bg-gray-primary hover:text-green-quaternary border-green-secondary bg-green-secondary"
                  : "border-gray-secondary bg-gray-secondary"
              }`}
            >
              {t("general.save").toUpperCase()}
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default ChangePassword;
