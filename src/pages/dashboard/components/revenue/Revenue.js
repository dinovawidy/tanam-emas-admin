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

const Revenue = () => {
  const t = useTranslation();
  const isLoading = useSelector((state) => state.reducer.isLoadingRevenue);
  const revenueData = useSelector((state) => state.reducer.revenueData);
  const highestChartData = useSelector(
    (state) => state.reducer.highestChartData
  );
  const dat1 = useSelector((state) => state.reducer.revenueChartData[0]);
  const dat2 = useSelector((state) => state.reducer.revenueChartData[1]);

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
    scales: {
      y: {
        min: 0,
        max: highestChartData < 1 ? 100000 : highestChartData,
        ticks: {
          maxTicksLimit: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
        offset: true,
      },
    },
  };

  const labels = [];

  let data = {
    labels,
    datasets: [
      {
        fill: true,
        label: t("general.this_period"),
        data: dat2,
        borderColor: "#BBAB7F",
        backgroundColor: "#92815445",
        lineTension: 0.3,
        borderDash: [10, 5],
      },
      {
        fill: true,
        label: t("general.last_period"),
        data: dat1,
        borderColor: "#5D7D73",
        backgroundColor: "#D6DBD3",
        lineTension: 0.3,
      },
    ],
  };

  return (
    <div className="section-grey p-2 h-[50vh] overflow-y-auto">
      <div className="flex p-2">
        <div className="flex-auto">
          <h2 className="text-sm py-2 mb-2 font-semibold tracking-widest text-[#A7ADA9]">
            {t("dashboard.revenue").toUpperCase()}
          </h2>
          {isLoading ? (
            <>
              <div className="text-sm font-bold">
                {t("dashboard.total_sales_all_merchant")}
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_product_sales")}
                </div>
                <Skeleton height="40px" />
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_revenue")} ({t("general.this_period")})
                </div>
                <Skeleton height="40px" />
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_revenue")} ({t("general.last_period")})
                </div>
                <Skeleton height="40px" />
              </div>
            </>
          ) : (
            <>
              <div className="text-sm font-bold pb-6">
                {t("dashboard.total_sales_all_merchant")}
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_product_sales")}
                </div>
                <div className="text-2xl font-extrabold">
                  {revenueData.product_sales}
                </div>
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_revenue")} ({t("general.this_period")})
                </div>
                <div className="text-2xl font-extrabold">
                  <span className="text-sm align-top">Rp</span>{" "}
                  {revenueData.revenue_this_period}
                </div>
                <div className="text-xs font-semibold">
                  <span
                    className={`${
                      revenueData.presentage >= 0
                        ? "text-[#5EB78D]"
                        : "text-red-500"
                    }`}
                  >
                    {revenueData.presentage >= 0
                      ? `↑ ${revenueData.presentage}`
                      : `↓ ${revenueData.presentage * -1}`}
                    %
                  </span>{" "}
                  {t("dashboard.from_last_week")}
                </div>
              </div>
              <div className="my-2">
                <div className="text-xs font-medium text-green-quaternary">
                  {t("dashboard.total_revenue")} ({t("general.last_period")})
                </div>
                <div className="text-2xl font-extrabold">
                  <span className="text-sm align-top">Rp</span>{" "}
                  {revenueData.revenue_last_period}
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

export default Revenue;
