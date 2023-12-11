import React from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../../../services/store-helper";
import HolidayDate from "./components/holidayDate/HolidayDate";
import OperationalMain from "./components/operationalMain/OperationalMain";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const OperationalHour = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const t = useTranslation();
    const page = useSelector((state) => state.reducer.page);
    store.getState();

    const nav = [
      { title: t("operationalhour.title"), route: "main" },
      { title: t("holidaydate.title"), route: "holiday" },
    ];

    const Content = () => {
      if (page === "main") {
        //show main
        return <OperationalMain />;
      } else if (page === "holiday") {
        //show operational hour
        return <HolidayDate />;
      }
    };

    return (
      <div className="flex flex-row gap-x-3">
        <div className="basis-1/5">
          <nav className=" bg-white rounded-xl">
            <ul className="flex-col items-center -space-x-px">
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
                      page === item.route ? "bg-gray-primary" : ""
                    } flex items-center px-6 py-3 rounded-xl`}
                  >
                    <h4 className="grow font-semibold">{item.title}</h4>
                    <i className="arrow right w-2 h-2"></i>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="basis-4/5 pl-3">
          <Content />
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

export default OperationalHour;
