import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../../../services/store-helper";
import { default as MainAction } from "../../redux/Action";
import Total from "./components/Total";
import reducerSlice from "./redux/Reducer";
import Action from "./redux/Action";
import Tabel from "./components/Tabel";
import HeaderTabel from "./components/HeaderTabel";
import Pagination from "../../../../components/Pagination/Pagination";

const MerchantList = ({ mainStore }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.reducer.list);
    const currentPage = useSelector((state) => state.reducer.currentPage);
    const loading = useSelector((state) => state.reducer.loading);
    const postPerPage = useSelector((state) => state.reducer.postPerPage);
    const total = useSelector((state) => state.reducer.total);
    const totalPage = useSelector((state) => state.reducer.totalPage);
    const search = useSelector((state) => state.reducer.search);
    store.getState();

    useEffect(() => {
      Action.getData(dispatch, { page: currentPage, postPerPage: postPerPage });
    }, []);

    return (
      <div className="flex gap-x-3">
        <div className="basis-8/12">
          <div className="rounded-2xl p-5 bg-gray-primary">
            <div className="flex flex-row items-center gap-x-5">
              <HeaderTabel search={search} postPerPage={postPerPage} />
            </div>
            <div className="my-2">
              <Tabel
                list={list}
                loading={loading}
                search={search}
                postPerPage={postPerPage}
                onClick={(item) => {
                  // change selected merchant WITH AWAIT
                  MainAction.changeSelectedMerchant(mainStore, { item: item });

                  // then change page
                  MainAction.getPage(mainStore, { page: "merchantBuyback" });
                }}
              />
            </div>
            <div>
              <Pagination
                totalPage={totalPage}
                postsPerPage={postPerPage}
                totalPosts={total}
                currentPage={currentPage}
                onClick={(page) => {
                  Action.getData(dispatch, { page: page });
                }}
              />
            </div>
          </div>
        </div>
        <div className=" basis-4/12 ">
          <div className="p-5 bg-gray-primary rounded-2xl h-auto">
            <Total totalPosts={total} loading={loading} />
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

export default MerchantList;
