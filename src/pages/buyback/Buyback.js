import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import BuybackMain from "./components/buybackMain/BuybackMain";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const Buyback = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const t = useTranslation();
    const page = useSelector((state) => state.reducer.page);
    store.getState();

    const Content = () => {
      if (page === "main") {
        //show main
        return <BuybackMain />;
      }
    };

    useEffect(() => {
      getBreadcrums(t("buyback.title"));
    }, []);

    return (
      <>
        <div className="flex flex-row">
          <div className="flex flex-row items-center px-2 gap-x-2">
            <i
              className={`${page !== "main" ? "cursor-pointer" : ""} mt-1.5`}
              onClick={() => {
                Action.getPage(store, { page: "main" });
              }}
            >
              <img
                className="h-full w-10"
                src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
                alt="back-icon"
              />
            </i>
            <h2 className="text-green-primary font-bold">
              {t("buyback.title")}
            </h2>
          </div>
        </div>

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
export default Buyback;
