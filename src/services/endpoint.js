//auth
const login = "/api/v1/auth/admin/login";
const forgotPassword = "/api/v1/auth/admin/forgot-password/reset";
const resetPassword = "/api/v1/auth/admin/forgot-password/create-new-password";
const accountProfile = "/api/v1/admin/profile/me";
const updateAccountProfile = "/api/v1/admin/edit-profile";
const changePassword = "/api/v1/admin/change-password";
const checkPass = "/api/v1/admin/validate-password";
const codePhone = "/api/v1/public/country-code";
const city = "/api/v1/public/cities/provinces";
const district = "/api/v1/public/districts/cities";
const province = "/api/v1/public/provinces";
const refreshToken = "/api/v1/auth/admin/refresh-token";

//product
const listProduct = "/api/v1/public/get-list-product";
const detailProduct = "/api/v1/public/get-list-product/detail";
const changeStatusProduct = "/api/v1/public/req-product";

//buyback
const listBuyback = "/api/v1/admin/get-list-buyback";
const detailBuyback = "/api/v1/admin/get-list-buyback/detail";
const statusBuyback = "/api/v1/admin/buyback-status";

//operational hour
const operationalHour = "/api/v1/admin/operational-hour/list";
const operationalHourEdit = "/api/v1/admin/operational-hour";

//holiday date
const holidayDate = "/api/v1/admin/holiday-date/list";
const holidayDateEdit = "/api/v1/admin/holiday-date";

//merchant
const listMerchant = "/api/v1/admin/get-list-merchant";
const detailMerchant = "/api/v1/admin/get-list-merchant/detail";
const buybackCompability = "/api/v1/public/update-merchant/status";
const suspendMerchant = "/api/v1/public/update-merchant/status/suspend";
const reqSuspendMerchant =
  "/api/v1/public/update-merchant/status/request-suspend";
const unsuspendMerchant = "/api/v1/public/update-merchant/status/unsuspend";
const editMerchant = "/api/v1/admin/update-merchant/account-details";

//customer
const listCustomer = "/api/v1/public/get-list-customer";
const detailCustomer = "/api/v1/public/get-list-customer/detail";
const suspendCustomer = "/api/v1/public/update-customer/status/suspend";
const unsuspendCustomer = "/api/v1/public/update-customer/status/unsuspend";
const reqsuspendCustomer =
  "/api/v1/public/update-customer/status/request-suspend";

//merchant request
const listMerchantRequest = "/api/v1/public/get-list-merchant-request";
const reqMerchantApproval = "/api/v1/public/req-approval-merchant-request";

//Admin
const listAdmin = "/api/v1/admin/list";
const detailAdmin = "/api/v1/admin/detail";
const createAdmin = "/api/v1/admin/create";
const generateAdminId = "/api/v1/admin/generate/id";
const levelAdmin = "/api/v1/admin/level";
const roleAdmin = "/api/v1/admin/role";
const changeStatusAdmin = "/api/v1/admin/change-status";
const updateAdmin = "/api/v1/admin/update";

//gold pricing
const listGoldPrice = "/api/v1/public/gold-pricing/list";
const goldGraphic = "/api/v1/public/gold-pricing/cart";
const editPrice = "/api/v1/public/gold-pricing/add";

//gold pickup
const listBuybackMerchant = "/api/v1/admin/gold-pickup/list-merchant";
const listBuybackMerchantById = "/api/v1/admin/gold-pickup/list-merchant-by-id";
const detailBuybackMerchantById =
  "/api/v1/admin/gold-pickup/list-merchant-by-id/detail";
const goldPickupTicket = "/api/v1/admin/gold-pickup-init-data";
const goldPickupReq = "/api/v1/admin/gold-pickup-request";
const listGoldPickup = "/api/v1/admin/gold-pickup-list";
const detailGoldPickup = "/api/v1/admin/gold-pickup-list/detail";
const goldPickupNotMatch = "/api/v1/admin/gold-pickup/status-not-match";
const goldPickupReceived = "/api/v1/admin/gold-pickup/status-received";
const goldPickupFinish = "/api/v1/admin/gold-pickup/status-finished";

//Dashboard
const dashboardBuybackSubmitted =
  "/api/v1/admin/dashboard-buyback/by-submitted";
const dashboardBuybackConfirmed =
  "/api/v1/admin/dashboard-buyback/by-confrimed";
const dashboardBuybackDeclined = "/api/v1/admin/dashboard-buyback/by-decline";
const dashboardRevenue = "/api/v1/admin/dashboard-total-sales-weekly";
const dashboardTopSelling = "/api/v1/admin/dashboard-top-seller-product";
const dashboardLeaderboard = "/api/v1/admin/dashboard-merchant-leaderboard";
const dashboardExportExcel = "/api/v1/admin/dashboard-export/excel";

//App Customization
const listCustomization = "/api/v1/admin/banners";
const saveCustomization = "/api/v1/admin/banners/save";

//Help Center
const listFeedbackMerchant = "/api/v1/feedbacks";
const listFeedbackCustomer = "/api/v1/feedbacks";
const detailFeedback = "/api/v1/feedbacks/detail";
const changeStatusFeedback = "/api/v1/feedbacks/change/status";

//QRCode
const listQR = "/api/v1/admin/qr/list";
const detailQR = "/api/v1/public/qr/detail";
const exportQR = "/api/v1/admin/qr/generate";
const deleteQR = "/api/v1/admin/qr/delete";
const productGram = "/api/v1/public/grams/list";

//notication
const getAllNotif = "/api/v1/admin/notifications";
const readNotif = "/api/v1/admin/notifications/read";
const readAllNotif = "/api/v1/admin/notifications/reads";
const countNotif = "/api/v1/admin/notifications/unread/total";

//balance
const getBalance = "/api/v1/admin/get-admin-balance";
const balanceHistory = "/api/v1/admin/get-admin-balance-history-list";
const inquiry = "/api/v1/admin/inquiry-withdrawal";
const withdraw = "/api/v1/admin/withdrawal";
const canWithdraw = "/api/v1/admin/can-withdrawal";

//bankdetail
const getListBank = "/api/v1/admin/get-bank-list";
const getBankDetail = "/api/v1/admin/get-admin-bank";
const editBankAdmin = "/api/v1/admin/edit-admin-bank"

const Endpoint = {
  login,
  listProduct,
  detailProduct,
  changeStatusProduct,
  listBuyback,
  detailBuyback,
  statusBuyback,
  listCustomer,
  detailCustomer,
  suspendCustomer,
  unsuspendCustomer,
  reqsuspendCustomer,
  listMerchantRequest,
  reqMerchantApproval,
  listAdmin,
  detailAdmin,
  createAdmin,
  generateAdminId,
  levelAdmin,
  roleAdmin,
  changeStatusAdmin,
  updateAdmin,
  listGoldPrice,
  goldGraphic,
  editPrice,
  listMerchant,
  detailMerchant,
  buybackCompability,
  suspendMerchant,
  reqSuspendMerchant,
  unsuspendMerchant,
  editMerchant,
  listBuybackMerchant,
  listBuybackMerchantById,
  detailBuybackMerchantById,
  goldPickupTicket,
  goldPickupReq,
  listGoldPickup,
  detailGoldPickup,
  goldPickupReceived,
  goldPickupNotMatch,
  goldPickupFinish,
  forgotPassword,
  resetPassword,
  accountProfile,
  updateAccountProfile,
  changePassword,
  codePhone,
  checkPass,
  city,
  province,
  district,
  dashboardBuybackSubmitted,
  dashboardBuybackConfirmed,
  dashboardBuybackDeclined,
  dashboardRevenue,
  dashboardTopSelling,
  dashboardLeaderboard,
  dashboardExportExcel,
  refreshToken,
  operationalHour,
  operationalHourEdit,
  holidayDate,
  holidayDateEdit,
  listCustomization,
  saveCustomization,
  listFeedbackCustomer,
  listFeedbackMerchant,
  detailFeedback,
  changeStatusFeedback,
  listQR,
  detailQR,
  exportQR,
  deleteQR,
  productGram,
  getAllNotif,
  readNotif,
  readAllNotif,
  countNotif,
  getBalance,
  balanceHistory,
  inquiry,
  withdraw,
  canWithdraw,
  getListBank,
  getBankDetail,
  editBankAdmin,
};

export default Endpoint;
