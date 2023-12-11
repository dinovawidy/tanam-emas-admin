import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "dashboard",
  initialState: {
    selectedBuybackTab: 0,
    buybackData: {},
    isLoadingBuyback: true,
    revenueData: {},
    revenueChartData: [[], []],
    highestChartData: 0,
    filter: "Week",
    filterInNumber: 0,
    isLoadingRevenue: true,
    topSellingTotalPage: 0,
    topSellingCurrentPage: 0,
    topSellingTotalData: 0,
    topSellingData: [],
    isLoadingTopSelling: true,
    leaderboardData: {},
    isLoadingLeaderboard: true,
    leaderboardIndex: 0,
    generateExcel: {},
    isLoadingGenerate: false,
  },
  reducers: {
    setBuybackTab: (state, action) => {
      state.selectedBuybackTab = action.payload;
    },
    setBuybackData: (state, action) => {
      state.buybackData = action.payload;
    },
    setIsLoadingBuyback: (state, action) => {
      state.isLoadingBuyback = action.payload;
    },
    setRevenueData: (state, action) => {
      state.revenueData = action.payload;
    },
    setRevenueChartData: (state, action) => {
      state.revenueChartData = action.payload;
    },
    setHighestChartData: (state, action) => {
      state.highestChartData = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setFilterInNumber: (state, action) => {
      state.filterInNumber = action.payload;
    },
    setIsLoadingRevenue: (state, action) => {
      state.isLoadingRevenue = action.payload;
    },
    setTopSellingData: (state, action) => {
      state.topSellingData = action.payload;
    },
    setTopSellingTotalPage: (state, action) => {
      state.topSellingTotalPage = action.payload;
    },
    setTopSellingCurrentPage: (state, action) => {
      state.topSellingCurrentPage = action.payload;
    },
    setTopSellingTotalData: (state, action) => {
      state.topSellingTotalData = action.payload;
    },
    setIsLoadingTopSelling: (state, action) => {
      state.isLoadingTopSelling = action.payload;
    },
    setLeaderboardData: (state, action) => {
      state.leaderboardData = action.payload;
    },
    setIsLoadingLeaderboard: (state, action) => {
      state.isLoadingLeaderboard = action.payload;
    },
    setLeaderboardIndex: (state, action) => {
      state.leaderboardIndex = action.payload;
    },
    setGenerateExcel: (state, action) => {
      state.generateExcel = action.payload;
    },
    setIsLoadingGenerate: (state, action) => {
      state.isLoadingGenerate = action.payload;
    },
  },
});

export const {
  setStatusMerchant,
  setBuybackTab,
  setBuybackData,
  setIsLoadingBuyback,
  setRevenueData,
  setRevenueChartData,
  setHighestChartData,
  setFilter,
  setFilterInNumber,
  setIsLoadingRevenue,
  setTopSellingData,
  setTopSellingTotalPage,
  setTopSellingCurrentPage,
  setTopSellingTotalData,
  setIsLoadingTopSelling,
  setLeaderboardData,
  setIsLoadingLeaderboard,
  setPopup,
  setLeaderboardIndex,
  setGenerateExcel,
  setIsLoadingGenerate,
} = reducerSlice.actions;
export default reducerSlice;
