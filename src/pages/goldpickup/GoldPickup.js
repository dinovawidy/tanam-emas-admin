import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import MerchantBuyback from "./components/merchantBuyback/MerchantBuyback";
import MerchantList from "./components/merchantList/MerchantList";
import Pickups from "./components/pickups/Pickups";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const GoldPickup = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const t = useTranslation();
    const page = useSelector((state) => state.reducer.page);
    const selectedMerchant = useSelector(
      (state) => state.reducer.selectedMerchant
    );
    store.getState();

    const nav = [
      { title: t("management.merchant_list"), route: "merchantList" },
      { title: t("goldpickup.pickups"), route: "pickups" },
    ];

    const Content = () => {
      if (page === "merchantList") {
        // return merchant list table
        return <MerchantList mainStore={store} />;
      } else if (page === "pickups") {
        // return pickups table
        return <Pickups />;
      } else if (page === "merchantBuyback") {
        // return merchant buyback table
        return (
          <MerchantBuyback
            mainStore={store}
            selectedMerchant={selectedMerchant}
          />
        );
      }
    };

    useEffect(() => {
      getBreadcrums(t("goldpickup.title"));
    }, []);

    return (
      <>
        <div className="flex flex-row items-center px-2 gap-x-2">
          <i
            className={`${
              page === "merchantBuyback" ? "cursor-pointer" : ""
            } mt-1.5`}
            onClick={() => {
              if (page === "merchantBuyback") {
                Action.getPage(store, { page: "merchantList" });
                Action.changeSelectedMerchant(store, { item: {} });
              }
            }}
          >
            <img
              className="h-full w-10"
              src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
              alt="back-icon"
            />
          </i>
          <h2 className="text-green-primary font-bold">
            {selectedMerchant.name === undefined
              ? t("goldpickup.title")
              : selectedMerchant.name}
          </h2>
        </div>
        {page === "merchantList" || page === "pickups" ? (
          <div className="flex items-center pt-2">
            <nav className="bg-gray-primary rounded-xl p-2">
              <ul className="inline-flex items-center -space-x-px">
                {nav.map((item, index) => (
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
                ))}
              </ul>
            </nav>
          </div>
        ) : (
          <></>
        )}

        <div className="pt-6">
          <Content />
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

export default GoldPickup;
