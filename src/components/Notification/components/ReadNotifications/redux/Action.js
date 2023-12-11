import NotificationsRepository from "../../../../../repositories/NotificationsRepository";
import NotificationModel from "../../../model/NotificationModel";
import {
  setCurrentPage,
  setHasMoreItems,
  setList,
  setLoadingData,
} from "./Reducer";

const getReadNotif = async (store, { currentList, page }) => {
  store.dispatch(setLoadingData(true));
  let payload = {
    status: "READ",
    page: page,
    size: 10,
  };
  const response = await NotificationsRepository.getAllNotif(payload);
  const data = [];
  if (!response.error) {
    response.data.data.data.forEach((element) => {
      data.push(
        NotificationModel({
          id: element.id,
          from: element.from,
          title: element.title,
          subtitle: element.body,
          createdAt: element.createdAt,
          read: element.read,
          type: element.type,
          subType: element.subType,
          dataId: element.dataId,
        })
      );
    });
    store.dispatch(setList([...currentList, ...data]));
    store.dispatch(setLoadingData(false));

    if (response.data.data.length > 0) {
      store.dispatch(setCurrentPage(page + 1));
    } else {
      store.dispatch(setHasMoreItems(false));
    }
  } else {
    store.dispatch(setList(data));
    store.dispatch(setHasMoreItems(false));
  }
};

const Action = {
  getReadNotif,
};

export default Action;
