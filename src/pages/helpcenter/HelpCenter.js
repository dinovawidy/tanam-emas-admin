import React from "react";
import { useTranslation } from "react-multi-lang";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import Customer from "./component/customer/Customer";
import Merchant from "./component/merchant/Merchant";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import UseAuth from "../auth/Auth";

const HelpCenter = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const t = useTranslation();
    store.getState();
    const page = useSelector((state) => state.reducer.page);

    const nav = [
      { title: t("helpcenter.merchant"), route: "merchant" },
      { title: t("helpcenter.customer"), route: "customer" },
    ];

    const isMerchant = UseAuth.checkFunction("helpcenter-merchant-feedback-page", "function");
    const isCustomer = UseAuth.checkFunction("helpcenter-customer-feedback-page", "function");

    const determineInitialPage = () => {
      if (isMerchant) {
        return "merchant";
      } else if (isCustomer) {
        return "customer";
      }
      return "";
    };

    const initialPage = determineInitialPage();

    const Parent = () => {
      if (page === "merchant" && UseAuth.checkFunction("helpcenter-merchant-feedback-page", "function")) {
        return <Merchant />;
      } else if (page === "customer" && UseAuth.checkFunction("helpcenter-customer-feedback-page", "function")) {
        return <Customer />;
      }
    };

    useEffect(() => {
      Action.getPage(store, { page: initialPage });
      getBreadcrums(t("helpcenter.title"));
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
            {t("helpcenter.title")}
          </h2>
        </div>

        <div className="flex items-center pt-2">

          <nav className="bg-gray-primary rounded-xl p-2">
            <ul className="inline-flex items-center -space-x-px">
              {nav.map((item, index) => {
                if (item.route === "merchant" && !UseAuth.checkFunction("helpcenter-merchant-feedback-page", "function")) {
                  return null;
                } else if (item.route === "customer" && !UseAuth.checkFunction("helpcenter-customer-feedback-page", "function")) {
                  return null;
                }
                
                return (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    Action.getPage(store, { page: item.route });
                  }}
                >
                  <div
                    className={`${
                      page === item.route ? "bg-gold-secondary text-white" : ""
                    } block px-6 py-2 rounded-xl drop-shadow-md leading-tight`}
                  >
                    {item.title}
                  </div>
                </li>
                )
              })}
            </ul>
          </nav>


        </div>
        <div className="pt-6">
          <Parent />
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

export default HelpCenter;
