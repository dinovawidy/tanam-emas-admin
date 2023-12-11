import React from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../../../../../services/store-helper";
import CalendarView from "./components/CalendarView";
import HolidayForm from "./components/HolidayForm";
import reducerSlice from "./redux/Reducer";

const HolidayDate = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const t = useTranslation();
    const showForm = useSelector((state) => state.reducer.showForm);
    const event = useSelector((state) => state.reducer.updateHoliday);
    store.getState();

    const Content = () => {
      if (!showForm) {
        //show calendar
        return <CalendarView />;
      } else {
        //show form
        return <HolidayForm />;
      }
    };

    return (
      <div className="rounded-2xl p-5 bg-gray-primary">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("holidaydate.title").toUpperCase()}
        </h4>
        <div className="pt-6 flex max-h-[60vh] overflow-y-auto">
          <div className="basis-1/4">
            <div className="text-lg font-semibold">
              {t("holidaydate.subtitle")}
            </div>
            <div className="pt-3 text-green-tertiary">
              {t("holidaydate.description")}
            </div>
          </div>
          <div className="basis-3/4">
            <Content />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default HolidayDate;
