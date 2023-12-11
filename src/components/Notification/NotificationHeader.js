import { Provider, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import StoreHelper from "../../services/store-helper";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import AllNotifications from "./components/AllNotifications/AllNotifications";
import UnreadNotifications from "./components/UnreadNotifications/UnreadNotifications";
import ReadNotifications from "./components/ReadNotifications/ReadNotifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotificationHeader = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const t = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showNotif = useSelector((state) => state.reducer.showNotif);
    const totalUnread = useSelector((state) => state.reducer.totalUnread);
    const page = useSelector((state) => state.reducer.page);
  
    const nav = [
      { title: t("notifications.all_notification"), route: "all" },
      { title: t("notifications.unread"), route: "unread" },
      { title: t("notifications.Read"), route: "read" },
    ];
  
    const Content = () => {
      if (page === "all") {
        return (
          <AllNotifications
            openNotif={(value) => {
              Action.openNotif(dispatch, navigate, value);
            }}
          />
        );
      } else if (page === "unread") {
        return (
          <UnreadNotifications
            openNotif={(value) => {
              Action.openNotif(dispatch, navigate, value);
            }}
          />
        );
      } else if (page === "read") {
        return (
          <ReadNotifications
            openNotif={(value) => {
              Action.openNotif(dispatch, navigate, value);
            }}
          />
        );
      }
    };
  
    const customFunction = () => {
      // This function will be called every 1 minute (60000 milliseconds)
      Action.totalUnread(store);
    };
  
    useEffect(() => {
      // Set an interval to call the function every 1 minute (60000 milliseconds)
      Action.totalUnread(store);
      const intervalId = setInterval(customFunction, 30000);
  
      // Clear the interval when the component unmounts to prevent memory leaks
      return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <div className="relative">
        <button
          className="relative block w-7 h-8 cursor-pointer"
          onClick={() => {
            Action.changeShowNotif(store, { showNotif: !showNotif });
            Action.getPage(store, { page: "all" });
          }}
        >
          <img
            className="h-7 w-4 absolute bottom-0 left-0"
            src={process.env.REACT_APP_ASSETS_IMAGE + "notification-icon.svg"}
            alt="notification-icon"
          />
          <span
            className={
              totalUnread !== 0
                ? "absolute right-0.5 top-1 header-notif h-4 w-4 text-center text-green-white"
                : "hidden"
            }
          >
            {totalUnread}
          </span>
        </button>
        {showNotif ? (
          <div className="absolute mt-6 section-grey b-0 -right-20 w-[29rem] max-h-[39rem] z-10 py-3">
            <div className="flex justify-between px-2">
              <h2 className="text-xl text-green-primary font-bold">
                {t("notifications.title")}
              </h2>
              <button
                className="text-green-secondary font-semibold"
                onClick={() => {
                  Action.readAll(store);
                }}
              >
                {t("notifications.mark_all_read")}
              </button>
            </div>
            <div className="border-t-2 mb-2" />
            <ul className="flex gap-x-3 overflow-x-auto px-2">
              {nav.map((item) => (
                <li
                  className="cursor-pointer"
                  key={item.title}
                  onClick={() => {
                    Action.getPage(store, { page: item.route });
                  }}
                >
                  <div
                    className={`${
                      page === item.route
                        ? "border-gold-secondary bg-[#BBAB7F1A]"
                        : ""
                    } border-2 block px-6 py-2 rounded-xl leading-tight text-gold-secondary`}
                  >
                    {item.title}
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t-2 mt-2" />
            <Content />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default NotificationHeader;
