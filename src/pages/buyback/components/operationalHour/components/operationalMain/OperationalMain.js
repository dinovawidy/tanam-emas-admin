import React from "react";
import { useTranslation } from "react-multi-lang";
import ButtonGreen from "../../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../../components/ButtonWhite/ButtonWhite";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../../../../../services/store-helper";
import reducerSlice, {
  setList,
  setDataSunday,
  setDataMonday,
  setDataTuesday,
  setDataWednesday,
  setDataThursday,
  setDataFriday,
  setDataSaturday,
  setInitialData,
  setEdit,
} from "./redux/Reducer";
import OperationalItem from "./components/OperationalItem";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import Action from "./redux/Action";

const OperationalMain = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const t = useTranslation();
    const dispatch = useDispatch();
    const loadingData = useSelector((state) => state.reducer.loadingData);

    const list = useSelector((state) => state.reducer.list);
    const dataMonday = useSelector((state) => state.reducer.dataMonday);
    const dataTuesDay = useSelector((state) => state.reducer.dataTuesDay);
    const dataWednesday = useSelector((state) => state.reducer.dataWednesday);
    const dataThursday = useSelector((state) => state.reducer.dataThursday);
    const dataFriday = useSelector((state) => state.reducer.dataFriday);
    const dataSaturday = useSelector((state) => state.reducer.dataSaturday);
    const dataSunday = useSelector((state) => state.reducer.dataSunday);
    const initialData = useSelector((state) => state.reducer.initialData);
    const edit = useSelector((state) => state.reducer.edit);

    store.getState();

    const daysOfWeek = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };

    useEffect(() => {
      Action.getOperationalHours(dispatch);
    }, []);

    return (
      <div className="rounded-2xl p-5 bg-gray-primary">
        <h4 className="flex-1 opacity-60 font-bold">
          {t("operationalhour.title").toUpperCase()}
        </h4>
        <div className="pt-6 flex max-h-[60vh] overflow-y-auto">
          <div className="basis-1/4">
            <p className="text-lg font-semibold">
              {t("operationalhour.subtitle")}
            </p>
            <p className="pt-3 text-green-tertiary">
              {t("operationalhour.description")}
            </p>
          </div>
          {loadingData ? (
            <div className="w-2/3">
              <Skeleton count={8} height="40px" />
            </div>
          ) : (
            <table className="w-2/3">
              {/* HEADER */}
              <thead>
                <tr>
                  <th>{t("operationalhour.day")}</th>
                  <th>{t("operationalhour.opening_hours")}</th>
                  <th>{t("operationalhour.closing_hours")}</th>
                </tr>
              </thead>
              {/* LIST OF DAYS */}
              <tbody>
                <OperationalItem
                  day={daysOfWeek[dataMonday.dayOfWeek]}
                  item={dataMonday}
                  setData={setDataMonday}
                />
                <OperationalItem
                  day={daysOfWeek[dataTuesDay.dayOfWeek]}
                  item={dataTuesDay}
                  setData={setDataTuesday}
                />
                <OperationalItem
                  day={daysOfWeek[dataWednesday.dayOfWeek]}
                  item={dataWednesday}
                  setData={setDataWednesday}
                />
                <OperationalItem
                  //day={t("operationalhour.thursday")}
                  day={daysOfWeek[dataThursday.dayOfWeek]}
                  item={dataThursday}
                  setData={setDataThursday}
                />
                <OperationalItem
                  day={daysOfWeek[dataFriday.dayOfWeek]}
                  item={dataFriday}
                  setData={setDataFriday}
                />
                <OperationalItem
                  day={daysOfWeek[dataSaturday.dayOfWeek]}
                  item={dataSaturday}
                  setData={setDataSaturday}
                />
                <OperationalItem
                  day={daysOfWeek[dataSunday.dayOfWeek]}
                  item={dataSunday}
                  setData={setDataSunday}
                />
              </tbody>
            </table>
          )}
        </div>

        <div className="pt-6 flex justify-end gap-x-6">
          <ButtonWhite
            title={t("general.cancel")}
            onClick={() => {
              dispatch(setEdit(false));
              Action.getOperationalHours(dispatch);
            }}
          />
          <ButtonGreen
            title={t("general.save")}
            onClick={() => {
              //save data
              Action.updateOperationalHour(dispatch, {
                monday: dataMonday,
                tuesday: dataTuesDay,
                wednesday: dataWednesday,
                thursday: dataThursday,
                friday: dataFriday,
                saturday: dataSaturday,
                sunday: dataSunday,
              });
            }}
          />
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

export default OperationalMain;
