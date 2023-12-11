import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "react-loading-skeleton";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../../../services/store-helper";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import DateUtility from "../../../../utils/date-utility";

const ReadNotifications = ({ openNotif }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const list = useSelector((state) => state.reducer.list);
    const currentPage = useSelector((state) => state.reducer.currentPage);
    const hasMoreItems = useSelector((state) => state.reducer.hasMoreItems);
    const loadingData = useSelector((state) => state.reducer.loadingData);
    return (
      <div className="max-h-[29rem] overflow-y-auto">
        <InfiniteScroll
          loadMore={async () => {
            if (!loadingData) {
              Action.getReadNotif(store, {
                currentList: list,
                page: currentPage,
              });
            }
          }}
          hasMore={hasMoreItems}
          loader={<Skeleton height={"35px"} />}
          useWindow={false}
          threshold={100}
        >
          <ul>
            {list.map((item, index) => (
              <li key={index}>
                <div
                  className="flex p-3 cursor-pointer"
                  onClick={() => {
                    openNotif(item);
                  }}
                >
                  <div className="flex h-10 w-10 mr-5 bg-green-secondary rounded-lg text-white font-bold text-md justify-center items-center">
                    {item.from.split(" ").map((n) => n[0])}
                  </div>
                  <div className="flex-1">
                    <div className="text-md font-semibold">{item.title}</div>
                    <div className="text-sm">{item.subtitle}</div>
                    <div className="text-sm text-gray-secondary font-medium">
                      {DateUtility.timeAgo(item.createdAt)} |
                      <span> {item.type}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default ReadNotifications;
