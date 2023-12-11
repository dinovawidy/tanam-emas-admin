import React from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import Action from "../../redux/Action";

const BuybackDashboard = ({ filter }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.reducer.isLoadingBuyback);
  const tabIndex = useSelector((state) => state.reducer.selectedBuybackTab);
  const data = useSelector((state) => state.reducer.buybackData);

  const tabs = [
    { title: t("general.submitted") },
    { title: t("general.confirmed") },
    { title: t("general.declined") },
  ];

  return (
    <div className="section-grey p-2 h-[50vh] overflow-y-auto">
      <h2 className="text-sm p-2 mb-2 font-semibold tracking-widest text-[#A7ADA9]">
        {t("buyback.title").toUpperCase()}
      </h2>
      <div className="flex mb-2">
        <div className="bg-white rounded-lg mb-2">
          {tabs.map((item, index) => (
            <button
              key={index}
              className={`${
                tabIndex === index
                  ? "bg-[#BBAB7F] rounded-lg text-white shadow-md "
                  : ""
              } hover:text-amber-200 text-xs px-3 py-2`}
              onClick={() => {
                Action.getBuyback(dispatch, filter, index);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="w-full section-white p-3 mb-2">
            <Skeleton height="40px" />
          </div>
          <div className="w-full section-white p-3 mb-2">
            <Skeleton height="40px" />
          </div>
          <div className="w-full section-white p-3 mb-2">
            <Skeleton height="40px" />
          </div>
        </>
      ) : (
        <div className="font-medium">
          <div className="w-full bg-white rounded-lg py-2 px-3 mb-2">
            <div className="flex">
              <div className="flex-auto">
                <div className="text-xs text-green-quaternary">
                  {t("dashboard.buyback_transaction")}
                </div>
              </div>
              <div className="flex-auto text-right">
                <div className="text-2xl font-extrabold">
                  {data.transaction}{" "}
                  <span className="text-sm font-bold align-top">
                    {t("general.transaction")}
                  </span>
                </div>
                <div className="text-xs">
                  <span
                    className={`${
                      data.transactionPersentage >= 0
                        ? "text-[#5EB78D]"
                        : "text-red-500"
                    }`}
                  >
                    {data.transactionPersentage >= 0
                      ? `↑ ${data.transactionPersentage}`
                      : `↓ ${data.transactionPersentage * -1}`}
                    %
                  </span>{" "}
                  from last period
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg py-2 px-3 mb-2">
            <div className="flex">
              <div className="flex-auto">
                <div className="text-xs text-green-quaternary">
                  {t("dashboard.total_gold_weight")}
                </div>
              </div>
              <div className="flex-auto text-right">
                <div className="text-2xl font-extrabold">
                  {data.goldWeight}{" "}
                  <span className="text-sm font-bold align-top">
                    {t("general.grams")}
                  </span>
                </div>
                <div className="text-xs">
                  <span
                    className={`${
                      data.goldWeightPersentage >= 0
                        ? "text-[#5EB78D]"
                        : "text-red-500"
                    }`}
                  >
                    {data.goldWeightPersentage >= 0
                      ? `↑ ${data.goldWeightPersentage}`
                      : `↓ ${data.goldWeightPersentage * -1}`}
                    %
                  </span>{" "}
                  from last period
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg py-2 px-3 mb-2">
            <div className="flex">
              <div className="flex-auto">
                <div className="text-xs text-green-quaternary">
                  {t("dashboard.total_gold_pcs")}
                </div>
              </div>
              <div className="flex-auto text-right">
                <div className="text-2xl font-extrabold">
                  {data.goldPcs}{" "}
                  <span className="text-sm font-bold align-top">
                    {t("general.pcs")}
                  </span>
                </div>
                <div className="text-xs">
                  <span
                    className={`${
                      data.goldPcsPersentage >= 0
                        ? "text-[#5EB78D]"
                        : "text-red-500"
                    }`}
                  >
                    {data.goldPcsPersentage >= 0
                      ? `↑ ${data.goldPcsPersentage}`
                      : `↓ ${data.goldPcsPersentage * -1}`}
                    %
                  </span>{" "}
                  from last period
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuybackDashboard;
