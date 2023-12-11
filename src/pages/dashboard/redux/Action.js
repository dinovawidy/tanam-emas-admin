import DashboardRepository from "../../../repositories/DashboardRepository";
import DateUtility from "../../../utils/date-utility";
import GeneralUtility from "../../../utils/general-utility";
import PopupUtility from "../../../utils/popup-utility";
import BuybackDashboardModel from "../models/BuybackDashboardModel";
import LeaderboardModel from "../models/LeaderboardModel";
import RevenueModel from "../models/RevenueModel";
import TopSellingModel from "../models/TopSellingModel";
import {
  setBuybackTab,
  setBuybackData,
  setTopSellingData,
  setRevenueChartData,
  setRevenueData,
  setHighestChartData,
  setFilter,
  setLeaderboardData,
  setTopSellingTotalData,
  setTopSellingTotalPage,
  setIsLoadingTopSelling,
  setIsLoadingLeaderboard,
  setIsLoadingRevenue,
  setIsLoadingBuyback,
  setFilterInNumber,
  setTopSellingCurrentPage,
  setLeaderboardIndex,
  setIsLoadingGenerate,
} from "./Reducer";

const getBuyback = async (dispatch, time, index) => {
  dispatch(setIsLoadingBuyback(true));
  dispatch(setBuybackTab(index));
  let payload = await DateUtility.dropdownDashboard(time);
  let response;
  let data;
  if (index === 0) {
    response = await DashboardRepository.getBuyback(payload);
  } else if (index === 1) {
    response = await DashboardRepository.getBuybackConfirmed(payload);
  } else if (index === 2) {
    response = await DashboardRepository.getBuybackDeclined(payload);
  }

  if (!response.error) {
    data = BuybackDashboardModel({
      transaction: response.data.data.transaction,
      transactionPersentage: response.data.data.persentageTransaction,
      goldWeight: response.data.data.weightTotal,
      goldWeightPersentage: response.data.data.persentageWeightTotal,
      goldPcs: response.data.data.quantityTotal,
      goldPcsPersentage: response.data.data.persentageQuantityTotal,
    });
  } else {
    data = BuybackDashboardModel({
      transaction: 0,
      transactionPersentage: 0,
      goldWeight: 0,
      goldWeightPersentage: 0,
      goldPcs: 0,
      goldPcsPersentage: 0,
    });
  }
  dispatch(setBuybackData(data));
  dispatch(setIsLoadingBuyback(false));
};

const getRevenueData = async (dispatch, time) => {
  dispatch(setIsLoadingRevenue(true));
  let filter;
  if (time === 0) {
    filter = "week";
  } else if (time === 1) {
    filter = "month";
  } else if (time === 2) {
    filter = "year";
  }
  let payload = await DateUtility.dropdownDashboard(time);
  let response = await DashboardRepository.getRevenue({
    ...payload,
    type: filter,
  });
  let chart1 = [];
  let chart2 = [];
  let highestValue;
  let data = {};

  if (!response.error) {
    let resData = response.data.data;
    data = RevenueModel({
      product_sales: resData.totalProductSales,
      revenue_this_period: GeneralUtility.addCommas(
        resData.totalPriceThisPeriod
      ),
      revenue_last_period: GeneralUtility.addCommas(
        resData.totalPriceLastPeriod
      ),
      presentage: resData.persentagePrice,
    });

    for (let i = 0; i < resData.chart.length; i++) {
      const dat = resData.chart[i].lastPeriod;
      const label = resData.chart[i].orderDate;
      chart1.push({ x: label, y: dat });
    }

    for (let i = 0; i < resData.chart.length; i++) {
      const dat = resData.chart[i].thisPeriod;
      const label = resData.chart[i].orderDate;
      chart2.push({ x: label, y: dat });
    }
  } else {
    data = RevenueModel({
      product_sales: 0,
      revenue_this_period: 0,
      revenue_last_period: 0,
    });
  }
  let final = [chart1, chart2];
  let joinedArray = chart1.concat(chart2);
  if (joinedArray.length > 0) {
    highestValue = joinedArray.reduce((prev, current) =>
      prev.y > current.y ? prev : current
    );
  } else {
    highestValue = { y: 100000 };
  }
  dispatch(setHighestChartData(highestValue.y));
  dispatch(setRevenueData(data));
  dispatch(setRevenueChartData(final));
  dispatch(setIsLoadingRevenue(false));
};

const getTopSelling = async (dispatch, { page, time }) => {
  dispatch(setIsLoadingTopSelling(true));
  dispatch(setTopSellingCurrentPage(page));
  let payload = await DateUtility.dropdownDashboard(time);
  let params = { ...payload.thisPeriod, page: page, size: 5 };
  let response = await DashboardRepository.getTopSelling(params);
  let data = [];
  if (!response.error) {
    response.data.data.data.forEach((element, index) => {
      const topSelling = TopSellingModel({
        id: index,
        merchant: element.merchantName,
        product: element.productName,
        salesCount: element.salesCount,
        totalSales: element.totalSales,
      });
      data.push(topSelling);
    });

    dispatch(setTopSellingTotalData(response.data.data.totalData));
    dispatch(setTopSellingTotalPage(response.data.data.totalPage));
  } else {
    const topSelling = TopSellingModel({
      id: 0,
      merchant: "",
      product: "",
      salesCount: 0,
      totalSales: 0,
    });
    data.push(topSelling);
  }
  dispatch(setTopSellingTotalData([]));
  dispatch(setTopSellingTotalPage([]));
  dispatch(setTopSellingData(data));
  dispatch(setIsLoadingTopSelling(false));
};

const getLeaderBoard = async (dispatch, { page, time }) => {
  dispatch(setIsLoadingLeaderboard(true));
  dispatch(setLeaderboardIndex(page));
  let payload = await DateUtility.dropdownDashboard(time);
  let response = await DashboardRepository.getLeaderBoard(payload);
  let data = [];

  if (!response.error && response.data.data.length > 1) {
    response.data.data.forEach((element, index) => {
      const leaderboard = LeaderboardModel({
        id: index,
        name: element.merchantName,
        totalSales: GeneralUtility.addCommas(element.totalProductSales),
        salesPersentage: element.percentageTotalProductSales,
        totalEarning: GeneralUtility.addCommas(element.totalEarning),
        earningPersentage: element.percentageTotalEarning,
      });
      data.push(leaderboard);
    });
  } else {
    const leaderboard = LeaderboardModel({
      id: 0,
      name: "",
      totalSales: 0,
      salesPersentage: 0,
      totalEarning: 0,
      earningPersentage: 0,
    });
    data.push(leaderboard);
  }
  dispatch(setLeaderboardData(data));
  dispatch(setIsLoadingLeaderboard(false));
};

const exportDashboard = async (dispatch, time) => {
  dispatch(setIsLoadingGenerate(true));
  let filter;
  if (time === 0) {
    filter = "week";
  } else if (time === 1) {
    filter = "month";
  } else if (time === 2) {
    filter = "year";
  }
  let payload = await DateUtility.dropdownDashboard(time);
  var response = await DashboardRepository.exportExcel({
    ...payload,
    type: filter,
  });

  if (!response.error) {
    const print = response.data.data;
    const downloadLink = print;
    if (downloadLink) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = downloadLink;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = "dashboard.xlsx"; // Adjust the file name if needed

      // Simulate a click event to trigger the file download
      link.click();

      // Clean up the temporary link element
      link.remove();
    }
  } else {
    PopupUtility.responseValidate(response.message);
  }
};

const getFilter = async (dispatch, time) => {
  let filter;
  if (time === 0) {
    filter = "Week";
  } else if (time === 1) {
    filter = "Month";
  } else if (time === 2) {
    filter = "Year";
  }
  dispatch(setFilter(filter));
  dispatch(setFilterInNumber(time));
};

const Action = {
  getBuyback,
  getRevenueData,
  getTopSelling,
  getLeaderBoard,
  getFilter,
  exportDashboard,
};

export default Action;
