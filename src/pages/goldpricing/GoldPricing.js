import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import dropdownDate from "../../utils/dropdown-date";
import ChangeLogPricing from "./components/ChangeLogPricing";
import ConfirmPricingModal from "./components/ConfirmPricingModal";
import FilterGoldPricing from "./components/FilterGoldPricing";
import FluctuationGraphic from "./components/FluctuationGraphic";
import Pricing from "./components/Pricing";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const GoldPricing = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const dispatch = useDispatch();
    const t = useTranslation();
    const showConfirmModal = useSelector(
      (state) => state.reducer.showConfirmModal
    );
    store.getState();

    useEffect(() => {
      const date = dropdownDate()[0].value;
      const startDate = date.start_date;
      const endDate = date.end_date;
      Action.getChangeLog(dispatch, {
        page: 0,
        startDate: startDate,
        endDate: endDate,
      });
      getBreadcrums(t("goldpricing.title"));
    }, []);

    return (
      <>
        <div className="flex flex-row">
          <div className="flex flex-row items-center px-2 gap-x-2">
            <i className="mt-1.5">
              <img
                className="h-full w-10"
                src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
                alt="back-icon"
              />
            </i>
            <h2 className="text-green-primary font-bold">
              {t("goldpricing.title")}
            </h2>
          </div>
          <div className="flex flex-1 justify-end">
            <FilterGoldPricing />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/4 m-2">
            <Pricing />
          </div>
          <div className="basis-3/4">
            <div className="m-2">
              <FluctuationGraphic />
            </div>
            <div className="m-2">
              <ChangeLogPricing />
            </div>
          </div>
        </div>
        {showConfirmModal ? <ConfirmPricingModal /> : <></>}
      </>
    );
  };

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default GoldPricing;
