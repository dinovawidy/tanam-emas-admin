import React from "react";
import { useTranslation } from "react-multi-lang";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import GeneralUtility from "../../../utils/general-utility";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const FluctuationGraphic = () => {
  const t = useTranslation();
  const loadingChart = useSelector((state) => state.reducer.loadingChart);
  const graphicList = useSelector((state) => state.reducer.graphicList);
  const currentPrice = useSelector((state) => state.reducer.currentPrice);

  const chart = React.useMemo(() => {
    if (graphicList.length > 0) {
      const datas = graphicList.map((item) => {
        return {
          y: item.buybackPrice,
          x: item.dateTime,
        };
      });
      return datas;
    }
    return [];
  }, [graphicList]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    display: false,
  };

  var data = {
    datasets: [
      {
        fill: true,
        label: t("goldpricing.buyback_price"),
        data: chart,
        borderColor: "#5D7D73",
        backgroundColor: "#D6DBD3",
        lineTension: 0.3,
        borderDash: [10, 5],
      },
    ],
  };

  return (
    <div className="section-grey p-2">
      <div className="flex p-2">
        <div className="flex-auto">
          <h2 className="text-sm mb-2 font-medium text-[#A7ADA9]">
            {t("goldpricing.fluctuation_graphic").toUpperCase()}
          </h2>
          {loadingChart ? (
            <>
              <div className="text-sm font-bold">
                {t("goldpricing.buyback_price")}
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("goldpricing.current_price")}
                </div>
                <Skeleton height="40px" />
              </div>
            </>
          ) : (
            <>
              <div className="text-sm font-bold">
                {t("goldpricing.buyback_price")}
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("goldpricing.current_price")}
                </div>
                <div className="text-xl font-bold">
                  <span className="text-sm align-top">Rp</span>{" "}
                  {GeneralUtility.addSeparator(currentPrice.currentPrice)}
                </div>
                <div className="text-xs font-semibold">
                  <span
                    className={`${
                      currentPrice.persentage >= 0
                        ? "text-[#5eca98]"
                        : "text-red-500"
                    }`}
                  >
                    {currentPrice.persentage >= 0
                      ? `↑ ${currentPrice.persentage}`
                      : `↓ ${currentPrice.persentage * -1}`}
                    %
                  </span>{" "}
                  {t("dashboard.from_last_change")}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex-auto self-end">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default FluctuationGraphic;
