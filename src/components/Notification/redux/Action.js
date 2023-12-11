import NotificationsRepository from "../../../repositories/NotificationsRepository";
import RouteName from "../../../services/routename";
import PopupUtility from "../../../utils/popup-utility";
import { setPage, setShowNotif, setTotalUnread } from "./Reducer";

const changeShowNotif = async (store, { showNotif }) => {
  store.dispatch(setShowNotif(showNotif));
  totalUnread(store);
};

const totalUnread = async (store) => {
  let response = await NotificationsRepository.getUnreadNotif();
  if (!response.error) {
    store.dispatch(setTotalUnread(response.data.data.total));
  } else {
    store.dispatch(setTotalUnread(0));
  }
};

const getPage = async (store, { page }) => {
  store.dispatch(setPage(page));
};

const openNotif = async (dispatch, navigate, item) => {
  let response = await NotificationsRepository.markRead({ id: item.id });
  if (!response.error) {
    dispatch(setShowNotif(false));
    if (item.type === "ORDER") {
      navigate(RouteName.orders, {
        state: { subType: item.subType },
      });
    } else if (item.type === "BUYBACK") {
      navigate(RouteName.buyback, {
        state: { subType: item.subType, id: item.dataId },
      });
    } else if (item.type === "GOLDPICKUP") {
      navigate(RouteName.goldpickup, {
        state: { subType: item.subType, id: item.dataId },
      });
    }
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const readAll = async (store) => {
  let response = await NotificationsRepository.readAll();
  if (!response.error) {
    store.dispatch(setPage("all"));
    totalUnread(store);
  } else {
    PopupUtility.responseValidate("Failed", response.message);
  }
};

const Action = {
  changeShowNotif,
  totalUnread,
  getPage,
  readAll,
  openNotif,
};

export default Action;
