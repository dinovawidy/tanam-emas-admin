import React from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderboardIndex } from "../../redux/Reducer";

const Leaderboard = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.reducer.isLoadingLeaderboard);
  const index = useSelector((state) => state.reducer.leaderboardIndex);
  const data = useSelector((state) => state.reducer.leaderboardData);

  return (
    <div className="section-grey p-2 h-[45vh] overflow-y-auto">
      <div className="flex justify-between items-center p-2">
        <h2 className="text-sm font-semibold tracking-widest text-[#A7ADA9]">
          {t("dashboard.merchant_leaderboard").toUpperCase()}
        </h2>
        <div className="flex">
          <button
            className="mr-4"
            onClick={() => {
              if (index > 0) {
                dispatch(setLeaderboardIndex(index - 1));
              }
            }}
          >
            <img
              className="h-7 w-7 rotate-180"
              src={process.env.REACT_APP_ASSETS_IMAGE + "arrow-active.svg"}
              alt="arrow-active"
            />
          </button>
          <button
            onClick={() => {
              if (index < data.length - 1) {
                dispatch(setLeaderboardIndex(index + 1));
              }
            }}
          >
            <img
              className="h-7 w-7"
              src={process.env.REACT_APP_ASSETS_IMAGE + "arrow-active.svg"}
              alt="arrow-active"
            />
          </button>
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="flex justify-between p-2">
            <div className="w-full">
              <Skeleton height="40px" />
            </div>
            <div className="text-5xl font-bold text-[#92815445]">01</div>
          </div>
          <div className="w-full section-white p-3 mb-2">
            <Skeleton height="40px" />
          </div>
          <div className="w-full section-white p-3 mb-2">
            <Skeleton height="40px" />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between px-2 py-1">
            <div className="text-2xl font-bold">{data[index].name}</div>
            <div className="text-5xl font-bold text-[#92815445]">
              0{index + 1}
            </div>
          </div>
          <div className="w-full section-white p-2 mb-2">
            <div className="flex">
              <div className="flex-auto">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_product_sales")}
                </div>
              </div>
              <div className="flex-auto text-right">
                <div className="text-2xl font-extrabold">
                  {data[index].totalSales}{" "}
                  <span className="text-xs font-normal align-top">items</span>
                </div>
                <div className="text-xs font-semibold">
                  <span
                    className={`${
                      data[index].salesPersentage >= 0
                        ? "text-[#5EB78D]"
                        : "text-red-500"
                    }`}
                  >
                    {data[index].salesPersentage >= 0
                      ? `↑ ${data[index].salesPersentage}`
                      : `↓ ${data[index].salesPersentage * -1}`}
                    %
                  </span>{" "}
                  {t("dashboard.from_last_period")}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full section-white p-2 mb-2">
            <div className="flex">
              <div className="flex-auto">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_earning")}
                </div>
              </div>
              <div className="flex-auto text-right">
                <div className="text-2xl font-extrabold">
                  <span className="text-sm align-top">Rp</span>{" "}
                  {data[index].totalEarning}
                </div>
                <div className="text-xs font-semibold">
                  <span
                    className={`${
                      data[index].earningPersentage >= 0
                        ? "text-[#5EB78D]"
                        : "text-red-500"
                    }`}
                  >
                    {data[index].earningPersentage >= 0
                      ? `↑ ${data[index].earningPersentage}`
                      : `↓ ${data[index].earningPersentage * -1}`}
                    %
                  </span>{" "}
                  {t("dashboard.from_last_period")}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
