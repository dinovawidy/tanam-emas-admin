import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../../../services/store-helper";
import Total from "./components/Total";
import reducerSlice from "./redux/Reducer";
import Action from "./redux/Action";
import Tabel from "./components/Tabel";
import HeaderTabel from "./components/HeaderTabel";
import Pagination from "../../../../components/Pagination/Pagination";
import Detail from "./components/Detail";

const Pickups = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.reducer.list);
    const currentPage = useSelector((state) => state.reducer.currentPage);
    const postPerPage = useSelector((state) => state.reducer.postPerPage);
    const total = useSelector((state) => state.reducer.total);
    const totalPage = useSelector((state) => state.reducer.totalPage);
    const showDetail = useSelector((state) => state.reducer.showDetail);
    const loading = useSelector((state) => state.reducer.loading);

    const search = useSelector((state) => state.reducer.search);
    const statusFilter = useSelector((state) => state.reducer.statusFilter);
    const startDateFilter = useSelector(
      (state) => state.reducer.startDateFilter
    );
    const endDateFilter = useSelector((state) => state.reducer.endDateFilter);

    store.getState();

    useEffect(() => {
      Action.getData(dispatch, { currentPage: currentPage, postPerPage: 5 });
    }, []);

    const ShowDetail = () => {
      if (showDetail) {
        return <Detail />;
      } else {
        return <Total totalPosts={total} />;
      }
    };

    return (
      <div className="flex gap-x-3">
        <div className="basis-8/12">
          <div className="rounded-2xl p-5 bg-gray-primary">
            <div className="flex flex-row items-center gap-x-5">
              <HeaderTabel
                search={search}
                postPerPage={postPerPage}
                statusFilter={statusFilter}
                startDateFilter={startDateFilter}
                endDateFilter={endDateFilter}
              />
            </div>
            <div className="my-2">
              <Tabel
              list={list}
              loading={loading}
              search={search}
              postPerPage={postPerPage}
              statusFilter={statusFilter}
               />
            </div>
            <div>
              <Pagination
                totalPage={totalPage}
                postsPerPage={postPerPage}
                totalPosts={total}
                currentPage={currentPage}
                onClick={(page) => {
                  Action.getData(dispatch, 
                    { currentPage: page,
                      search: search,
                      statusFilter: statusFilter,
                      postPerPage: postPerPage,
                    });
                }}
              />
            </div>
          </div>
        </div>
        <div className=" basis-4/12 ">
          <div className="p-5 bg-gray-primary rounded-2xl h-auto">
            <ShowDetail />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default Pickups;
