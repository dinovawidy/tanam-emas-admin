import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useSelector } from "react-redux";
import StoreHelper from "../../services/store-helper";
import Action from "./redux/Action";
import reducerSlice from "./redux/Reducer";
import Generate from "./component/generate/Generate";
import List from "./component/list/List";

const Buyback = ({ getBreadcrums }) => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  const MainComponent = () => {
    const t = useTranslation();
    const page = useSelector((state) => state.reducer.page);
    store.getState();

    const Content = () => {
      if (page === "main") {
        return (
          <List
            getPage={(value) => {
              Action.getPage(store, { page: value });
            }}
          />
        );
      } else if (page === "secondary") {
        return (
          <Generate
            getPage={(value) => {
              Action.getPage(store, { page: value });
            }}
          />
        );
      }
    };

    useEffect(() => {
      getBreadcrums(t("generateqr.title"));
    }, []);

    return (
      <>
        <Content />
      </>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};
export default Buyback;
