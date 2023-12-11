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

const Product = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);

  const MainComponent = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.reducer.currentPage);
    const loading = useSelector((state) => state.reducer.loading);
    const search = useSelector((state) => state.reducer.search);
    const postPerPage = useSelector((state) => state.reducer.postPerPage);
    const total = useSelector((state) => state.reducer.total);
    const totalPage = useSelector((state) => state.reducer.totalPage);
    const showDetail = useSelector((state) => state.reducer.showDetail);
    const statusFilter = useSelector((state) => state.reducer.statusFilter);
    const startDateFilter = useSelector(
      (state) => state.reducer.startDateFilter
    );
    const endDateFilter = useSelector((state) => state.reducer.endDateFilter);
    const categoryId = useSelector((state) => state.reducer.categoryId);
    const fieldName = useSelector((state) => state.reducer.fieldName);
    const orderBy = useSelector((state) => state.reducer.orderBy);

    const ShowDetail = () => {
      if (showDetail) {
        return <Detail />;
      } else {
        return (
          <Total
            totalPosts={total}
            loading={loading}
            statusFilter={statusFilter}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
          />
        );
      }
    };

    useEffect(() => {
      Action.getList(dispatch, {
        search: "",
        currentPage: currentPage,
        postPerPage: 5,
        statusFilter: "",
        fieldName: "",
        orderBy: ""
      });

    }, []);
    return (
      <div className="flex flex-row gap-x-3">
        <div className="flex-1">
          <div className="rounded-2xl p-5 bg-gray-primary">
            <div>
              <HeaderTabel
                search={search}
                postPerPage={postPerPage}
                statusFilter={statusFilter}
                startDateFilter={startDateFilter}
                endDateFilter={endDateFilter}
                categoryId={categoryId}
                fieldName={fieldName}
                orderBy={orderBy}
              />
            </div>
            <div className="my-2">
              <Tabel
                // list={list}
                loading={loading}
                search={search}
                postPerPage={postPerPage}
                statusFilter={statusFilter}
                startDateFilter={startDateFilter}
                endDateFilter={endDateFilter}
                categoryId={categoryId}
              //onClick={Action.changeShowDetail}
              />
            </div>
            <div>
              <Pagination
                totalPage={totalPage}
                postsPerPage={postPerPage}
                totalPosts={total}
                currentPage={currentPage}
                onClick={(page) => {
                  Action.getList(dispatch, {
                    currentPage: page,
                    search: search,
                    postPerPage: postPerPage,
                    statusFilter: statusFilter,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                    categoryId: categoryId,
                    fieldName: fieldName,
                    orderBy: orderBy
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-[23rem]">
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

export default Product;
