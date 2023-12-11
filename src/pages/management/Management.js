import { useTranslation } from "react-multi-lang";
import { React, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import ButtonGold from "../../components/ButtonGold/ButtonGold";
import StoreHelper from "../../services/store-helper";
import Admin from "./component/admin/Admin";
import Customer from "./component/customer/Customer";
import Merchant from "./component/merchant/Merchant";
import Product from "./component/product/Product";
import Action from "./redux/Action";
import reducerSlice, { setTotalReqMerchant } from "./redux/Reducer";
import RequestMerchant from "./component/requestmerchant/RequestMerchant";
import CreateModal from "./component/admin/component/CreateModal";
import UseAuth from "../auth/Auth";
import { setDisabled } from "./redux/Reducer";
import ButtonRequest from "./component/requestmerchant/component/ButtonRequest";

const Management = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    store.getState();
    const t = useTranslation();
    const dispatch = useDispatch();
    const page = useSelector((state) => state.reducer.page);
    const showModalAdmin = useSelector((state) => state.reducer.showModalAdmin);
    const disabled = useSelector((state) => state.reducer.disabled);
    const totalReqMerchant = useSelector(
      (state) => state.reducer.totalReqMerchant
    );
    const nav = [
      { title: t("management.admin"), route: "admin" },
      { title: t("management.merchant"), route: "merchant" },
      { title: t("management.customer"), route: "customer" },
      { title: t("management.product"), route: "product" },
    ];

    const isAdmin = UseAuth.checkFunction("management-admin-page", "function");
    const isMerchant = UseAuth.checkFunction(
      "management-merchant-page",
      "function"
    );
    const isCustomer = UseAuth.checkFunction(
      "management-customer-page",
      "function"
    );
    const isProduct = UseAuth.checkFunction(
      "managament-product-page",
      "function"
    );

    const determineInitialPage = () => {
      if (isAdmin) {
        return "admin";
      } else if (isMerchant) {
        return "merchant";
      } else if (isCustomer) {
        return "customer";
      } else if (isProduct) {
        return "product";
      }
      return "";
    };

    const initialPage = determineInitialPage();

    const getTotal = () => {
      Action.getCountReqMerchant(dispatch);
    };

    const Parent = () => {
      if (
        page === "admin" &&
        UseAuth.checkFunction("management-admin-page", "function") === true
      ) {
        return <Admin />;
      } else if (
        page === "customer" &&
        UseAuth.checkFunction("management-customer-page", "function") === true
      ) {
        return <Customer />;
      } else if (
        page === "merchant" &&
        UseAuth.checkFunction("management-merchant-page", "function") === true
      ) {
        return <Merchant />;
      } else if (
        page === "product" &&
        UseAuth.checkFunction("managament-product-page", "function") === true
      ) {
        return <Product />;
      } else if (
        page === "request" &&
        UseAuth.checkFunction(
          "management-merchant-request-page",
          "function"
        ) === true
      ) {
        return <RequestMerchant getTotal={getTotal} />;
      } else {
      }
    };

    //problem on identifier button
    const ButtonManagement = () => {
      if (
        page === "admin" &&
        UseAuth.checkFunction(
          "createaccount-admin-management-button",
          "button"
        ) === true
      ) {
        return (
          <>
            <ButtonGold
              title={"CREATE ACCOUNT"}
              onClick={() => {
                Action.changeShowModalAdmin(dispatch, { showModal: true });
              }}
            />

            {showModalAdmin && (
              <CreateModal setDisabled={setDisabled} disabled={disabled} />
            )}
          </>
        );
      } else if (
        page === "merchant" &&
        UseAuth.checkFunction(
          "management-merchant-request-page",
          "function"
        ) === true
      ) {
        return (
          <ButtonRequest
            getPage={() => {
              Action.getPage(store, { page: "request" });
            }}
            totalReqMerchant={totalReqMerchant}
          />
        );
      }
    };

    useEffect(() => {
      Action.getPage(store, { page: initialPage });
      getBreadcrums(t("management.title"));
      Action.getCountReqMerchant(dispatch);
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
          <h2 className="text-green-primary font-bold">Management</h2>
        </div>

        <div className="flex items-center pt-2">
          <nav className="bg-gray-primary rounded-xl p-2">
            <ul className="inline-flex items-center -space-x-px">
              {nav.map((item, index) => {
                // Periksa hasil dari checkFunction untuk menyembunyikan opsi "admin"
                if (
                  item.route === "admin" &&
                  !UseAuth.checkFunction("management-admin-page", "function")
                ) {
                  return null; // Tidak merender opsi "admin" jika tidak memenuhi kondisi
                } else if (
                  item.route === "merchant" &&
                  !UseAuth.checkFunction("management-merchant-page", "function")
                ) {
                  return null;
                } else if (
                  item.route === "customer" &&
                  !UseAuth.checkFunction("management-customer-page", "function")
                ) {
                  return null;
                } else if (
                  item.route === "product" &&
                  !UseAuth.checkFunction("managament-product-page", "function")
                ) {
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
                        page === item.route
                          ? "bg-gold-secondary text-white"
                          : ""
                      } block px-6 py-2 rounded-xl drop-shadow-md leading-tight`}
                    >
                      {item.title}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex-1 text-right">
            <ButtonManagement />
          </div>
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

export default Management;
