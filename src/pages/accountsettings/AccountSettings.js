import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import ChangePassword from "./components/changepassword/ChangePassword";
import EditProfile from "./components/editprofile/EditProfile";
import BankDetails from "./components/bankdetails/BankDetails";

const AccountSettings = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const t = useTranslation();
    store.getState();
    const page = useSelector((state) => state.reducer.page);

    const Parent = () => {
      if (page === "editprofile") {
        return <EditProfile />;
      } else if (page === "changepassword") {
        return <ChangePassword />;
      } else if(page === "bankdetails") {
        return <BankDetails />
      }
    };

    useEffect(() => {
      Action.getPage(store, { page: page });
      getBreadcrums(t("accountsettings.title"));
    }, []);

    return (
      <>
        <div className="flex flex-row items-center px-2 gap-x-2">
          <i className="mt-1.5">
            <img
              className="h-full w-10"
              src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
              alt="back-icon"
            />
          </i>
          <h2 className="text-green-primary font-bold">
            {t("accountsettings.title")}
          </h2>
        </div>

        <div className="flex flex-row gap-x-3 pt-3">
          <div className="flex flex-col bg-gray-primary rounded-xl w-72 text-md h-fit">

            <div
              className="cursor-pointer"
              onClick={() => {
                Action.getPage(store, { page: "editprofile" });
              }}
            >
              <div
                className={`${
                  page === "editprofile"
                    ? "font-semibold"
                    : "bg-white rounded-t-xl"
                } p-4 leading-tight flex flex-row`}
              >
                <div
                  className={`${page === "editprofile" ? "pl-3" : ""} flex-1`}
                >
                  {t("accountsettings.edit_profile")}
                </div>
                <div className="flex text-right">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                Action.getPage(store, { page: "bankdetails" });
              }}
            >
              <div
                className={`${
                  page === "bankdetails"
                    ? "font-semibold"
                    : "bg-white rounded-t-xl"
                } p-4 leading-tight flex flex-row`}
              >
                <div
                  className={`${page === "bankdetails" ? "pl-3" : ""} flex-1`}
                >
                  {t("accountsettings.bank_details")}
                </div>
                <div className="flex text-right">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                Action.getPage(store, { page: "changepassword" });
              }}
            >
              <div
                className={`${
                  page === "changepassword"
                    ? "font-semibold"
                    : "bg-white rounded-b-xl"
                } p-4 leading-tight flex flex-row`}
              >
                <div
                  className={`${
                    page === "changepassword" ? "pl-3" : ""
                  } flex-1`}
                >
                  {t("accountsettings.change_password")}
                </div>
                <div className="flex text-right">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-primary rounded-xl px-2 py-5">
            <Parent />
          </div>
        </div>
      </>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default AccountSettings;
