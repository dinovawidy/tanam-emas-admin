import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import ButtonGenExcel from "../../components/ButtonGenExcel/ButtonGenExcel";
import StoreHelper from "../../services/store-helper";
import UseAuth from "../auth/Auth";
import BuybackDashboard from "./components/buyback/BuybackDashboard";
import FilterDashboard from "./components/FilterDashboard";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Revenue from "./components/revenue/Revenue";
import TopSellingProducts from "./components/topselling/TopSellingProducts";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const Dashboard = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    store.getState();
    const dispatch = useDispatch();
    const t = useTranslation();
    const filter = useSelector((state) => state.reducer.filterInNumber);
    const data = UseAuth.getUser();
    useEffect(() => {
      Action.getBuyback(dispatch, 0, 0);
      Action.getRevenueData(dispatch, 0);
      Action.getTopSelling(dispatch, { page: 0, time: 0 });
      Action.getLeaderBoard(dispatch, { page: 0, time: 0 });
      getBreadcrums(t("dashboard.title"));
    }, []);

    const handleGenerateExcel = () => {
      Action.exportDashboard(dispatch, filter);
    };

    return (
      <>
        <div>
          <div className="flex flex-row items-center px-2 gap-x-2">
            <i className="mt-1.5">
              <img
                className="h-full w-10"
                src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
                alt="back-icon"
              />
            </i>
            <h2 className="text-green-primary font-bold">
              {t("dashboard.title")}
            </h2>
          </div>

          <div className="flex items-center px-2">
            <div className="text-lg font-semibold">
              {t("dashboard.greeting", { params: data.nameAdmin })}
            </div>

            <div className="flex-1 flex justify-end items-stretch">
              <FilterDashboard />
              <div className="border mx-5" />
              <ButtonGenExcel 
              title={t("dashboard.generate_excel")} 
              onClick={() => {
                handleGenerateExcel()
              }}
              />

            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="basis-2/6 my-1 mr-1">
            <BuybackDashboard filter={filter} />
          </div>
          <div className="basis-4/6 my-1 ml-1">
            <Revenue />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="basis-3/5 my-1 mr-1">
            <TopSellingProducts filter={filter} />
          </div>
          <div className="basis-2/5 my-1 ml-1">
            <Leaderboard />
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

export default Dashboard;
