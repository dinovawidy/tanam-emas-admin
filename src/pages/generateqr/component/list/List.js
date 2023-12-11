import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import StoreHelper from "../../../../services/store-helper";
import { Provider, useDispatch, useSelector } from "react-redux";
import Total from "./components/Total";
import HeaderTabel from "./components/HeaderTable";
import Tabel from "./components/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import Detail from "./components/Detail";
import ButtonGold from "../../../../components/ButtonGold/ButtonGold";
import UseAuth from "../../../auth/Auth";

const List = ({ getPage }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const t = useTranslation();
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.reducer.currentPage);
    const postPerPage = useSelector((state) => state.reducer.postPerPage);
    const total = useSelector((state) => state.reducer.total);
    const totalPage = useSelector((state) => state.reducer.totalPage);
    const showDetail = useSelector((state) => state.reducer.showDetail);
    const search = useSelector((state) => state.reducer.search);

    const ShowDetail = () => {
      if (showDetail) {
        return <Detail />;
      } else {
        return <Total totalProduct={total} />;
      }
    };

    useEffect(() => {
      Action.getList(dispatch, {
        page: currentPage,
        search: search,
        postPerPage: postPerPage,
        fieldName: "createdBy",
        orderBy: "desc",
      });
    }, []);

    return (
      <>
        <div className="flex flex-row">
          <div className="flex flex-row items-center px-2 gap-x-2">
            <i className="mt-1.5">
              <img
                className="h-full w-10"
                src={process.env.REACT_APP_ASSETS_IMAGE + "back-icon.svg"}
                alt="back-icon"
              />
            </i>
            <h2 className="text-green-primary font-bold">
              {t("generateqr.title")}
            </h2>
          </div>
          
          {UseAuth.checkFunction("generate-new-qr-button", "button") === true ? (
          <div className="flex-1 text-right">
            <ButtonGold
              title={t("generateqr.new_qr")}
              onClick={() => {
                getPage("secondary");
              }}
            />
          </div>
          ) : ""}
        </div>

        <div className="pt-6">
          <div className="flex gap-x-3">
            <div className="basis-8/12">
              <div className="rounded-2xl p-5 bg-gray-primary">
                <div>
                  <HeaderTabel search={search} postPerPage={postPerPage} />
                </div>
                <div className="my-2">
                  <Tabel search={search} postPerPage={postPerPage} />
                </div>
                <div>
                  <Pagination
                    totalPage={totalPage}
                    postsPerPage={postPerPage}
                    totalPosts={total}
                    currentPage={currentPage}
                    onClick={(page) => {
                      Action.getList(dispatch, {
                        page: page,
                        search: search,
                        postPerPage: postPerPage,
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
          </div>
        </div>
      </>
    );
  };

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default List;
