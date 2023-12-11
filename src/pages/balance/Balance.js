import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import Action from "./redux/Action";
import reducerSlice, {
  setEndDateFilter,
  setStartDateFilter,
} from "./redux/Reducer";

import DetailBalance from "./components/DetailBalance";
import BalanceItem from "./components/BalanceItem";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";

const Balance = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  store.getState();

  const MainComponent = () => {
    const dispatch = useDispatch();
    const t = useTranslation();
    const list = useSelector((state) => state.reducer.list);
    const data = useSelector((state) => state.reducer.data);
    const startDateFilter = useSelector(
      (state) => state.reducer.startDateFilter
    );
    const endDateFilter = useSelector((state) => state.reducer.endDateFilter);

    useEffect(() => {
      getBreadcrums(t("balance.title"));
      Action.getBalance(dispatch);
      Action.inquiry(dispatch);
      Action.canWithdraw(dispatch);
      // Action.postWd(dispatch);
      Action.getHistory(dispatch, { startDateFilter: "", endDateFilter: "", page: 0, size: 9999 });
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
          <h2 className="text-green-primary font-bold">{t("balance.title")}</h2>
        </div>
        <div className="flex flex-row gap-x-3 pt-3">
          <div className="w-72">
            <DetailBalance />
          </div>
          <div className="flex-1">
            <div className="bg-gray-primary rounded-xl py-4 px-2 ">
              <div className="inline-flex items-center gap-x-5 pb-2">
                <div className="text-sm text-gray-secondary font-semibold ml-3">
                  {t("balance.history").toUpperCase()}
                </div>
                <div>
                  <DateRangePicker
                    startDateValue={startDateFilter}
                    endDateValue={endDateFilter}
                    onOpen={() => {
                      dispatch(setStartDateFilter(""));
                      dispatch(setEndDateFilter(""));
                    }}
                    onChange={(dateObject) => {
                      var d0 = new Date(dateObject[0]);
                      //gunakan yang d0 bukan d0ISOString
                      if (dateObject.length > 1) {
                        var d1 = new Date(dateObject[1]);
                        dispatch(setStartDateFilter(d0.toISOString()));
                        dispatch(setEndDateFilter(d1.toISOString()));
                      } else {
                        dispatch(setStartDateFilter(d0.toISOString()));
                        dispatch(setEndDateFilter(""));
                      }
                    }}
                    onClose={() => {
                      Action.getHistory(dispatch, {
                        startDateFilter: startDateFilter,
                        endDateFilter: endDateFilter,
                      });
                    }}
                    format="MMM DD, YYYY"
                    placeholder={t("buyback.date_range_placeholder")}
                    inputClass="block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white  placeholder:text-slate-40 cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:h-[41em] overflow-y-auto">
                {list.map((items, index) => (
                  <div key={index}>
                    <BalanceItem items={items} />
                  </div>
                ))}
              </div>
            </div>
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

export default Balance;
