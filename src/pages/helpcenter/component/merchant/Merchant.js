import React from "react";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination/Pagination";
import StoreHelper from "../../../../services/store-helper";
import Detail from "./component/Detail";
import HeaderTabel from "./component/HeaderTabel";
import Tabel from "./component/Tabel";
import Total from "./component/Total";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const Merchant = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const dispatch = useDispatch();

    const list = useSelector((state) => state.reducer.list);
    const search = useSelector((state) => state.reducer.search);
    const currentPage = useSelector((state) => state.reducer.currentPage);
    const loading = useSelector((state) => state.reducer.loading);
    const postPerPage = useSelector((state) => state.reducer.postPerPage);
    const totalData = useSelector((state) => state.reducer.totalData);
    const totalPage = useSelector((state) => state.reducer.totalPage);
    const showDetail = useSelector((state) => state.reducer.showDetail);
    const statusFilter = useSelector((state) => state.reducer.statusFilter);

    const ShowDetail = () => {
      if (showDetail) {
        return <Detail />;
      } else {
        return <Total totalData={totalData} loading={loading} />;
      }
    };

    useEffect(() => {
      Action.getList(dispatch, {
        currentPage: currentPage,
        postPerPage: 5,
        fieldName: "issuedDate",
        orderBy: "desc",
      });
    }, []);
    return (
      <div className="flex gap-x-3">
        <div className="basis-8/12">
          <div className="rounded-2xl p-5 bg-gray-primary">
            <div className="flex flex-row items-center gap-x-5">
              <HeaderTabel
                search={search}
                postPerPage={postPerPage}
                statusFilter={statusFilter}
              />
            </div>
            <div className="my-2">
              <Tabel
                list={list}
                loading={loading}
                search={search}
                statusFilter={statusFilter}
                postPerPage={postPerPage}
                //onClick={Action.changeShowDetail}
              />
            </div>
            <div>
              <Pagination
                totalPage={totalPage}
                postsPerPage={postPerPage}
                totalData={totalData}
                currentPage={currentPage}
                onClick={(page) => {
                  Action.getList(dispatch, {
                    currentPage: page,
                    search: search,
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

export default Merchant;
