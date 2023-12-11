import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import Action from "./redux/Action";
import StoreHelper from "../../../../services/store-helper";
import reducerSlice, {
  setShow,
  setValidatePass,
} from "./redux/Reducer";
import PopupPassword from "../../../../components/PopupPassword/PopupPassword";
import PopupConfirmation from "../../../../components/PopupConfirmation/PopupConfirmation";
import Select from "react-select";
import UseAuth from "../../../auth/Auth";

const BankDetails = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  store.getState();

  const MainComponent = () => {
    const t = useTranslation();
    const dispatch = useDispatch();

    const show = useSelector((state) => state.reducer.show);
    const bank = useSelector((state) => state.reducer.bank);
    const bankDetails = useSelector((state) => state.reducer.bankDetails);
    const data = useSelector((state) => state.reducer.data);
    const edit = useSelector((state) => state.reducer.edit);
    const canSave = useSelector((state) => state.reducer.canSave);
    const validateStatus = useSelector((state) => state.reducer.validateStatus);
    const validatePass = useSelector((state) => state.reducer.validatePass);
    const pass = useSelector((state) => state.reducer.pass);
    const errorBankDetails = useSelector(
      (state) => state.reducer.errorBankDetails
    );

    useEffect(() => {
      Action.getBank(dispatch);
      Action.getData(dispatch);
    }, []);

    useEffect(() => {
      if (validateStatus === true) {
        Action.validate(dispatch, bankDetails, edit);
      }
    }, [bankDetails]);

    return (
      <form>
        <div
          className={`flex flex-col gap-y-4  overflow-y-auto px-3 md:h-[${
            edit === false ? "20em" : "30em"
          }em]`}
        >
          {!edit && UseAuth.checkFunction("bank-detail-admin-button", "button") === true ? (   
            <a
            className="cursor-pointer ml-auto"
            onClick={() => {
                dispatch(setValidatePass(true));
            }}
          >
            <img
              src={process.env.REACT_APP_ASSETS_IMAGE + "edit-icon.svg"}
              alt="edit-icon"
            />
          </a>

            // <div className="text-md text-right font-bold">
            //   <div
            //     className="cursor-pointer underline underline-offset-2 hover:text-black"
            //     onClick={() => {
            //       dispatch(setValidatePass(true));
            //     }}
            //   >
            //     Edit
            //   </div>
            // </div>
          ) : ""}

          {edit === false ? (
            <>
              {/* bank account name */}
              <div className="flex flex-row items-center gap-x-3 text-md pt-2">
                <div className="w-44">
                  <div className="font-bold">
                    {t("accountsettings.account_name")}
                    <span className="text-gold-secondary">*</span>
                  </div>
                </div>
                <div className="flex-1">{data.name}</div>
              </div>
              <hr />

              {/* bank name */}
              <div className="flex flex-row items-center text-md gap-x-3">
                <div className="w-44">
                  <div className="font-bold">
                    {t("accountsettings.bank_name")}
                    <span className="text-gold-secondary">*</span>
                  </div>
                </div>
                <div className="flex-1">{data.bankName}</div>
              </div>
              <hr />

              {/* Bank Number */}
              <div className="flex flex-row items-center gap-x-3 text-md pb-2">
                <div className="w-44">
                  <div className="font-bold">
                    {t("accountsettings.account_number")}
                    <span className="text-gold-secondary">*</span>
                  </div>
                </div>
                <div className="flex-1">{data.bankNumber}</div>
              </div>
              <hr />
            </>
          ) : (
            <>
              {/* bank account name */}
              <div className="flex flex-row items-center gap-x-3 pt-2">
                <div className="w-44">
                  <div
                    className={`text-md font-bold ${
                      errorBankDetails.bankName ? "pb-4" : " "
                    }`}
                  >
                    {t("accountsettings.account_name")}
                    <span className="text-gold-secondary">*</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="AccountbankName"
                    defaultValue={data.name}
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, bankDetails);
                    }}
                    placeholder={t("accountsettings.account_name")}
                    className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      errorBankDetails.bankName
                        ? "border-red-500 border-1"
                        : "border-0"
                    }`}
                  />
                  
                  <p className={`text-red-500 ${
        errorBankDetails.bankName ? "block" : "hidden"
      }`}>{errorBankDetails.bankName}</p>
                </div>
              </div>
              <hr />

              {/* bank name */}
              <div className="flex flex-row items-center gap-x-3">
                <div className="w-44">
                  <div
                    className={`text-md font-bold ${
                      errorBankDetails.bankId ? "pb-4" : " "
                    }`}
                  >
                    {t("accountsettings.bank_name")}
                    <span className="text-gold-secondary">*</span>
                  </div>
                </div>
                <div className="flex-1">
                <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: errorBankDetails.bankId ? "red" : "white",
                      }),
                    }}
                    className="text-sm border w-full bg-white font-medium"
                    options={bank}
                    defaultValue={{ label: bankDetails.bankName, value: bankDetails.bankId }}
                    name="bankId"
                    onChange={(item) => {
                      Action.handleChange(dispatch, {
                        target: { name: "bankId", value: item.value },
                      }, bankDetails);
                    }}
                    // value={data.bankId}
                  />
                  <p className="text-red-500">{errorBankDetails.bankId}</p>
                </div>
              </div>
              <hr />

              {/* Bank Number */}
              <div className="flex flex-row items-center gap-x-3 pb-2">
                <div className="w-44">
                  <div
                    className={`text-md font-bold ${
                      errorBankDetails.bankNumber ? "pb-4" : " "
                    }`}
                  >
                    {t("accountsettings.account_number")}
                    <span className="text-gold-secondary">*</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="bankNumber"
                    defaultValue={data.bankNumber}
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, bankDetails);
                    }}
                    placeholder={t("accountsettings.input_account_number")}
                    className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      errorBankDetails.bankNumber
                        ? "border-red-500 border-1"
                        : "border-0"
                    }`}
                  />
                  <p className="text-red-500">{errorBankDetails.bankNumber}</p>
                </div>
              </div>
              <hr />

              <div className="flex flex-row-reverse gap-x-2 pt-5 pb-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (canSave) {
                      dispatch(setShow(true));
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
            </>
          )}
        </div>

        {validatePass === true ? (
          <PopupPassword
            onCancel={() => {
              dispatch(setValidatePass(false));
            }}
            onSubmit={(pass, e) => {
              Action.checkValid(dispatch, pass, e);
            }}
            section={t("accountsettings.bank_details")}
          />
        ) : (
          ""
        )}

        {show ? (
          <PopupConfirmation
            onCancel={() => {
              dispatch(setShow(false));
            }}
            onSubmit={() => {
              Action.handleSubmit(dispatch, bankDetails, pass);
              dispatch(setShow(false));
            }}
            title={t("accountsettings.confirmation_title")}
            subtitle={t("accountsettings.confirmation_subtitle")}
          />
        ) : (
          ""
        )}
      </form>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default BankDetails;
