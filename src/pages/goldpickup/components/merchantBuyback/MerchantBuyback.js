import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination/Pagination";
import StoreHelper from "../../../../services/store-helper";
import Detail from "./components/Detail";
import HeaderTabel from "./components/HeaderTable";
import PickupModal from "./components/PickupModal";
import Table from "./components/Table";
import Total from "./components/Total";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";

const MerchantBuyback = ({ mainStore, selectedMerchant }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.reducer.currentPage);
    const postPerPage = useSelector((state) => state.reducer.postPerPage);
    const total = useSelector((state) => state.reducer.total);
    const totalPage = useSelector((state) => state.reducer.totalPage);
    const showDetail = useSelector((state) => state.reducer.showDetail);

    const search = useSelector((state) => state.reducer.search);
    const statusFilter = useSelector((state) => state.reducer.statusFilter);
    const startDateFilter = useSelector(
      (state) => state.reducer.startDateFilter
    );
    const endDateFilter = useSelector((state) => state.reducer.endDateFilter);
    const totalQuantity = useSelector(
      (state) => state.reducer.detailTotalQuantity
    );
    const totalWeight = useSelector((state) => state.reducer.detailTotalWeight);

    const showModal = useSelector((state) => state.reducer.showModal);

    useEffect(() => {
      Action.getData(dispatch, {
        id: selectedMerchant.id,
        page: currentPage,
        postPerPage: postPerPage,
      });
    }, []);

    const ShowDetail = () => {
      if (showDetail) {
        return <Detail />;
      } else {
        return (
          <Total
            totalPosts={total}
            totalWeight={totalWeight}
            totalQuantity={totalQuantity}
          />
        );
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
                id={selectedMerchant.id}
              />
            </div>
            <div className="my-2">
              <Table
                search={search}
                postPerPage={postPerPage}
                statusFilter={statusFilter}
                startDateFilter={startDateFilter}
                endDateFilter={endDateFilter}
                id={selectedMerchant.id}
              />
            </div>
            <div>
              <Pagination
                totalPage={totalPage}
                postsPerPage={postPerPage}
                totalPosts={total}
                currentPage={currentPage}
                onClick={(page) => {
                  Action.getData(dispatch, {
                    id: selectedMerchant.id,
                    page: page,
                    search: search,
                    statusFilter: statusFilter,
                    postPerPage: postPerPage,
                    startDateFilter: startDateFilter,
                    endDateFilter: endDateFilter,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="basis-4/12">
          <div className="p-5 bg-gray-primary rounded-2xl h-auto">
            <ShowDetail />
          </div>
        </div>
        {showModal ? (
          <PickupModal
            mainStore={mainStore}
            selectedMerchant={selectedMerchant}
          />
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

export default MerchantBuyback;
