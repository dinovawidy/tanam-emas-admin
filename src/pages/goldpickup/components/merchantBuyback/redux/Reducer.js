import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "merchantBuyback",
  initialState: {
    list: [],
    loading: true,
    currentPage: 0,
    postPerPage: 5,
    total: 0,
    totalPage: 0,
    search: "",
    startDateFilter: "",
    endDateFilter: "",
    statusFilter: "",
    fieldName: "",
    orderBy: "",
    showDetail: false,

    ticketList: [],
    idList: [],
    ticketId: "",
    totalWeight: 0,
    totalQuantity: 0,
    totalPrice: 0,
    showModal: false,

    selectedPickupMethod: "",
    selectedPickupDate: "",
    remarks: "",
    errorPickUp: {},
    canSave: false,

    detailTotalWeight: 0,
    detailTotalQuantity: 0,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPostPerPage: (state, action) => {
      state.postPerPage = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStartDateFilter: (state, action) => {
      state.startDateFilter = action.payload;
    },
    setEndDateFilter: (state, action) => {
      state.endDateFilter = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setShowDetail: (state, action) => {
      state.showDetail = action.payload;
    },
    setTicketList: (state, action) => {
      state.ticketList = action.payload;
    },
    setIdList: (state, action) => {
      state.idList = action.payload;
    },
    setTicketId: (state, action) => {
      state.ticketId = action.payload;
    },
    setTotalWeight: (state, action) => {
      state.totalWeight = action.payload;
    },
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setSelectedPickupMethod: (state, action) => {
      state.selectedPickupMethod = action.payload;
    },
    setSelectedPickupDate: (state, action) => {
      state.selectedPickupDate = action.payload;
    },
    setRemarks: (state, action) => {
      state.remarks = action.payload;
    },
    setErrorPickUp: (state, action) => {
      state.errorPickUp = action.payload;
    },
    setCanSave: (state, action) => {
      state.canSave = action.payload;
    },
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setDetailTotalWeight: (state, action) => {
      state.detailTotalWeight = action.payload;
    },
    setDetailTotalQuantity: (state, action) => {
      state.detailTotalQuantity = action.payload;
    },
  },
});

export const {
  setList,
  setLoading,
  setCurrentPage,
  setPostPerPage,
  setTotal,
  setTotalPage,
  setSearch,
  setStartDateFilter,
  setEndDateFilter,
  setStatusFilter,
  setShowDetail,
  setTicketList,
  setIdList,
  setTicketId,
  setTotalWeight,
  setTotalQuantity,
  setTotalPrice,
  setShowModal,
  setSelectedPickupMethod,
  setSelectedPickupDate,
  setRemarks,
  setErrorPickUp,
  setCanSave,
  setFieldName,
  setOrderBy,
  setDetailTotalQuantity,
  setDetailTotalWeight,
} = reducerSlice.actions;
export default reducerSlice;
